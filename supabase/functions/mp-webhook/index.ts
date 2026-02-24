// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
};

function generateTempPassword() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$*()_+";
    let pwd = "";
    for (let i = 0; i < 14; i++) pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    return pwd;
}

serve(async (req) => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

    try {
        const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
        const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
        const MP_ACCESS_TOKEN = Deno.env.get("MP_ACCESS_TOKEN") || "";
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
        const EMAIL_FROM = Deno.env.get("EMAIL_FROM") || "Cursos <noreply@tudominio.com>";
        const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || "";

        const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
        const url = new URL(req.url);

        // Parse body/query to get payment ID
        let body: any = null;
        try { body = await req.json(); } catch { body = {}; }

        let paymentId = url.searchParams.get("data.id") || url.searchParams.get("id");
        if (!paymentId) paymentId = body?.data?.id || body?.id;
        if (!paymentId) {
            const resource = url.searchParams.get("resource") || body?.resource;
            if (resource) {
                const match = resource.match(/\/payments\/(\d+)/);
                if (match?.[1]) paymentId = match[1];
            }
        }

        if (!paymentId) {
            return new Response(JSON.stringify({ ok: true, note: "Webhook without payment id" }), { status: 200, headers: corsHeaders });
        }

        // Server-to-server check
        const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
        });
        const payment = await mpRes.json().catch(() => null);

        if (!mpRes.ok || !payment) {
            return new Response(JSON.stringify({ ok: false, error: "Cannot verify payment" }), { status: 200, headers: corsHeaders });
        }

        // Get order ID
        const externalReference = payment.external_reference;
        const metadataOrderId = payment.metadata?.orderId || payment.metadata?.order_id;
        let orderFindQuery = supabase.from("orders").select("*");

        if (externalReference) orderFindQuery = orderFindQuery.eq("external_reference", externalReference);
        else if (metadataOrderId) orderFindQuery = orderFindQuery.eq("id", metadataOrderId);
        else {
            return new Response(JSON.stringify({ ok: true, note: "Payment has no external_reference / metadata" }), { status: 200, headers: corsHeaders });
        }

        const { data: order, error: orderErr } = await orderFindQuery.maybeSingle();

        if (orderErr || !order) {
            return new Response(JSON.stringify({ ok: true, note: "Order not found" }), { status: 200, headers: corsHeaders });
        }

        const { data: course } = await supabase.from("courses").select("slug, title").eq("id", order.course_id).maybeSingle();

        // Idempotency: if already approved and processed, skip
        if (order.status === "approved" && order.mp_payment_id === String(payment.id)) {
            return new Response(JSON.stringify({ ok: true, note: "Already processed" }), { status: 200, headers: corsHeaders });
        }

        // Update order status regardless of approved or not
        const currentStatus = String(payment.status);
        await supabase.from("orders").update({
            status: currentStatus,
            mp_payment_id: String(payment.id),
            mp_preference_id: payment.preference_id || order.mp_preference_id
        }).eq("id", order.id);

        if (currentStatus !== "approved") {
            return new Response(JSON.stringify({ ok: true, order_id: order.id, status: currentStatus }), { status: 200, headers: corsHeaders });
        }

        // Process approval
        let userId: string | null = null;
        let newPassword = "";
        let isNewUser = false;

        // Check if user exists
        const { data: existingUserObj, error: userSearchErr } = await supabase.auth.admin.getUserByEmail(order.email);

        // Auth api can sometimes return error if user don't exist, sometimes returns empty.
        if (existingUserObj?.user?.id) {
            userId = existingUserObj.user.id;
        } else {
            // Create User
            newPassword = generateTempPassword();
            const { data: newUserObj, error: createError } = await supabase.auth.admin.createUser({
                email: order.email,
                password: newPassword,
                email_confirm: true,
                user_metadata: { must_change_password: true }
            });

            if (createError || !newUserObj?.user?.id) {
                return new Response(JSON.stringify({ ok: false, error: "Failed to create user", details: createError }), { status: 200, headers: corsHeaders });
            }
            userId = newUserObj.user.id;
            isNewUser = true;
        }

        // Insert Course Access
        await supabase.from("course_access").upsert({
            user_id: userId,
            course_id: order.course_id,
            active: true
        }, { onConflict: "user_id,course_id" });

        // Send email
        let emailStatus = "sent";
        let emailError = null;
        let providerId = null;

        if (RESEND_API_KEY) {
            const courseUrl = `${APP_BASE_URL}/player/${course?.slug || order.course_id}`;
            let emailHtml = "";
            if (isNewUser) {
                emailHtml = `
          <h2>¡Tu acceso está listo!</h2>
          <p>Has adquirido el curso: <strong>${course?.title || "Curso"}</strong></p>
          <p>Tus credenciales de acceso temporal son:</p>
          <ul>
            <li>Email: ${order.email}</li>
            <li>Contraseña temporal: <strong>${newPassword}</strong></li>
          </ul>
          <p><strong>Importante:</strong> Se te pedirá que cambies esta contraseña al ingresar por primera vez.</p>
          <p><a href="${courseUrl}">Ir al curso</a></p>
        `;
            } else {
                emailHtml = `
          <h2>¡Tu acceso está listo!</h2>
          <p>Se ha añadido el curso <strong>${course?.title || "Curso"}</strong> a tu cuenta existente.</p>
          <p>Puedes acceder con tus credenciales habituales.</p>
          <p><a href="${courseUrl}">Ir al curso</a></p>
        `;
            }

            const resendRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${RESEND_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: EMAIL_FROM,
                    to: order.email,
                    subject: "Tus credenciales de acceso - AulaExpress",
                    html: emailHtml
                })
            });

            const resendData = await resendRes.json().catch(() => null);
            if (!resendRes.ok) {
                emailStatus = "failed";
                emailError = JSON.stringify(resendData);
            } else {
                providerId = resendData?.id;
            }
        } else {
            emailStatus = "failed";
            emailError = "RESEND_API_KEY no configurada";
        }

        // Log Email
        await supabase.from("email_logs").insert({
            order_id: order.id,
            type: "credentials",
            to_email: order.email,
            status: emailStatus,
            provider_id: providerId,
            error: emailError
        });

        return new Response(JSON.stringify({ ok: true, emailStatus }), { status: 200, headers: corsHeaders });

    } catch (err: any) {
        return new Response(JSON.stringify({ ok: false, error: "Webhook failed", details: err?.message }), { status: 500, headers: corsHeaders });
    }
});
