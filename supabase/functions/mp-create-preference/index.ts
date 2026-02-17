// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
};

const VERSION = "mp-create-preference@2026-02-17T20:10Z_amount_ars";

function json(body: any, status = 200) {
  const payload =
    body && typeof body === "object" && !Array.isArray(body)
      ? { version: VERSION, ...body }
      : { version: VERSION, body };
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 200);

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const MP_ACCESS_TOKEN = Deno.env.get("MP_ACCESS_TOKEN") || "";
    const MP_WEBHOOK_URL = Deno.env.get("MP_WEBHOOK_URL") || "";
    const PUBLIC_APP_URL = Deno.env.get("PUBLIC_APP_URL") || "";

    if (!SUPABASE_URL || !SERVICE_ROLE || !MP_ACCESS_TOKEN) {
      return json({
        ok: false,
        error: "Missing secrets",
        missing: {
          SUPABASE_URL: !SUPABASE_URL,
          SUPABASE_SERVICE_ROLE_KEY: !SERVICE_ROLE,
          MP_ACCESS_TOKEN: !MP_ACCESS_TOKEN,
        },
      }, 200);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    let body: any = null;
    try {
      body = await req.json();
    } catch {
      body = null;
    }

    const slug = body?.slug;
    const buyerEmail = body?.buyer_email;

    if (!slug || typeof slug !== "string") {
      return json({ ok: false, error: "Missing slug" }, 200);
    }
    if (!buyerEmail || typeof buyerEmail !== "string") {
      return json({ ok: false, error: "Missing buyer_email" }, 200);
    }

    const { data: course, error: courseErr } = await supabase
      .from("courses")
      .select("id, title, price, slug")
      .eq("slug", slug)
      .maybeSingle();

    if (courseErr || !course) {
      return json({ ok: false, error: "Course not found", details: courseErr?.message }, 200);
    }

    const unitPrice = Number(course.price ?? 0);
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      return json({ ok: false, error: "Invalid course price", unitPrice }, 200);
    }

    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        buyer_email: buyerEmail,
        course_id: course.id,
        course_slug: course.slug,
        amount_ars: unitPrice,
        amounts_ars: unitPrice,
        status: "created",
      } as any)
      .select("id")
      .single();

    if (orderErr || !order) {
      return json({
        ok: false,
        error: "Could not create order",
        details: orderErr?.message,
        hint: "Si sigue diciendo amount_ars null, casi seguro estás llamando una versión vieja o tu schema orders tiene otro NOT NULL adicional.",
        debug: {
          attempted_amount_ars: unitPrice,
          attempted_amounts_ars: unitPrice,
          course_slug: course.slug,
        },
      }, 200);
    }

    const preferencePayload: any = {
      items: [
        {
          title: course.title,
          quantity: 1,
          unit_price: unitPrice,
          currency_id: "ARS",
        },
      ],
      payer: {
        email: buyerEmail,
      },
      external_reference: order.id,
      metadata: {
        order_id: order.id,
        course_slug: course.slug,
        buyer_email: buyerEmail,
      },
    };

    if (MP_WEBHOOK_URL) {
      preferencePayload.notification_url = MP_WEBHOOK_URL;
    }

    if (PUBLIC_APP_URL) {
      preferencePayload.back_urls = {
        success: `${PUBLIC_APP_URL}/checkout/success?order_id=${order.id}`,
        pending: `${PUBLIC_APP_URL}/checkout/pending?order_id=${order.id}`,
        failure: `${PUBLIC_APP_URL}/checkout/failure?order_id=${order.id}`,
      };
      preferencePayload.auto_return = "approved";
    }

    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferencePayload),
    });

    const mpJson = await mpRes.json().catch(() => ({}));

    if (!mpRes.ok) {
      await supabase
        .from("orders")
        .update({ status: "mp_preference_error", mp_raw: mpJson })
        .eq("id", order.id);

      return json({ ok: false, error: "Mercado Pago preference error", mp: mpJson }, 200);
    }

    await supabase
      .from("orders")
      .update({ status: "preference_created", mp_raw: mpJson })
      .eq("id", order.id);

    const isTest = MP_ACCESS_TOKEN.startsWith("TEST-");
    const checkoutUrl = isTest ? mpJson?.sandbox_init_point : mpJson?.init_point;

    if (!checkoutUrl) {
      await supabase
        .from("orders")
        .update({ status: "mp_missing_checkout_url", mp_raw: mpJson })
        .eq("id", order.id);

      return json({
        ok: false,
        error: "Mercado Pago no devolvió checkout URL",
        details: "Falta init_point/sandbox_init_point",
        order_id: order.id,
        mp: mpJson,
      }, 200);
    }

    return json({
      ok: true,
      order_id: order.id,
      preference: mpJson,
      checkout_url: checkoutUrl,
      init_point: mpJson?.init_point,
      sandbox_init_point: mpJson?.sandbox_init_point,
    });
  } catch (err: any) {
    console.log("MP_CREATE_PREFERENCE_UNHANDLED", {
      message: err?.message,
      name: err?.name,
    });
    return json({ ok: false, error: "Unhandled error", details: err?.message }, 200);
  }
});
