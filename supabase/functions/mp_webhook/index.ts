// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
};

function json(body: any, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function extractPaymentId(url: URL, body: any): string | null {
  const fromQuery = url.searchParams.get("data.id") || url.searchParams.get("id");
  if (fromQuery) return fromQuery;

  const fromBody = body?.data?.id || body?.id;
  if (fromBody) return String(fromBody);

  // Mercado Pago a veces manda `resource` o `data.resource`
  const resource = url.searchParams.get("resource") || body?.resource || body?.data?.resource;
  if (resource && typeof resource === "string") {
    const match = resource.match(/\/v1\/payments\/(\d+)/) || resource.match(/\/payments\/(\d+)/);
    if (match?.[1]) return match[1];
  }

  return null;
}

serve(async (req) => {
  const url = new URL(req.url);

  const raw = await req.text().catch(() => "");
  let body: any = null;
  try {
    body = raw ? JSON.parse(raw) : null;
  } catch {
    body = raw;
  }

  console.log("MP_WEBHOOK_HIT", {
    method: req.method,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams.entries()),
    headers: {
      "content-type": req.headers.get("content-type"),
      "user-agent": req.headers.get("user-agent"),
      "x-forwarded-for": req.headers.get("x-forwarded-for"),
    },
    body,
  });

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const MP_ACCESS_TOKEN = Deno.env.get("MP_ACCESS_TOKEN")!;

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  const paymentId = extractPaymentId(url, body);
  if (!paymentId) {
    return json(
      { ok: true, note: "Webhook recibido pero sin payment id (data.id/resource)" },
      200,
    );
  }

  const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
  });

  const payment = await safeJson(mpRes);

  console.log("MP_PAYMENT_FETCH", {
    paymentId,
    mpOk: mpRes.ok,
    status: payment?.status,
    status_detail: payment?.status_detail,
  });

  if (!mpRes.ok || !payment) {
    return json({ ok: false, error: "No pude leer payment", paymentId, payment }, 200);
  }

  const orderId = payment?.external_reference;
  if (!orderId) {
    return json({ ok: false, error: "payment sin external_reference", paymentId, payment }, 200);
  }

  const mpStatus = String(payment?.status ?? "unknown");
  const mpStatusDetail = payment?.status_detail ? String(payment.status_detail) : null;

  // Actualizar order
  const { data: updatedOrder, error: updErr } = await supabase
    .from("orders")
    .update({
      status: mpStatus,
      mp_payment_id: String(payment?.id ?? paymentId),
      mp_status_detail: mpStatusDetail,
      mp_raw: payment,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select("id, buyer_email, course_id, course_slug")
    .maybeSingle();

  if (updErr) {
    return json({ ok: false, error: "No pude actualizar orders", details: updErr.message }, 200);
  }

  // Si no existe la orden, igual respondemos 200 para que MP no reintente infinito, pero dejamos log.
  if (!updatedOrder) {
    console.log("MP_ORDER_NOT_FOUND", { orderId, paymentId, mpStatus });
    return json({ ok: true, note: "Order no encontrada", orderId, mpStatus }, 200);
  }

  // Solo otorgar acceso si approved
  if (mpStatus !== "approved") {
    return json({ ok: true, order_id: updatedOrder.id, payment_status: mpStatus }, 200);
  }

  if (!updatedOrder.course_id) {
    return json({ ok: false, error: "Order sin course_id", order_id: updatedOrder.id }, 200);
  }

  const buyerEmail = updatedOrder.buyer_email;
  if (!buyerEmail) {
    return json({ ok: false, error: "Order sin buyer_email", order_id: updatedOrder.id }, 200);
  }

  // Upsert de usuario por email
  let userId: string | null = null;

  const { data: existingUser, error: getUserErr } = await supabase.auth.admin.getUserByEmail(
    buyerEmail,
  );

  if (getUserErr) {
    console.log("MP_GET_USER_BY_EMAIL_ERR", { buyerEmail, error: getUserErr.message });
  }

  if (existingUser?.user?.id) {
    userId = existingUser.user.id;
  } else {
    const { data: created, error: createUserErr } = await supabase.auth.admin.createUser({
      email: buyerEmail,
      email_confirm: true,
    });

    if (createUserErr || !created?.user?.id) {
      return json(
        {
          ok: false,
          error: "No pude crear user",
          buyer_email: buyerEmail,
          details: createUserErr?.message,
        },
        200,
      );
    }

    userId = created.user.id;
  }

  // Insertar purchase (idempotente)
  const { error: purchaseErr } = await supabase
    .from("purchases")
    .upsert(
      {
        user_id: userId,
        course_id: updatedOrder.course_id,
      },
      { onConflict: "user_id,course_id" },
    );

  if (purchaseErr) {
    return json(
      {
        ok: false,
        error: "No pude registrar purchase",
        order_id: updatedOrder.id,
        details: purchaseErr.message,
      },
      200,
    );
  }

  return json({
    ok: true,
    order_id: updatedOrder.id,
    payment_status: mpStatus,
    buyer_email: buyerEmail,
    granted: true,
  });
});
