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

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const MP_ACCESS_TOKEN = Deno.env.get("MP_ACCESS_TOKEN") || "";
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
    const EMAIL_FROM = Deno.env.get("EMAIL_FROM") || "onboarding@resend.dev";
    const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || "";

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    async function logStep(payment_id: any, order_id: any, step: string, status: string, data: any = null, error: any = null) {
        try {
            console.log(`[${step}] ${status}`, error || "");
            await supabase.from("webhook_logs").insert({
                payment_id: payment_id ? String(payment_id) : null,
                order_id: order_id,
                step,
                status,
                data,
                error: error ? (typeof error === 'string' ? error : JSON.stringify(error)) : null
            });
        } catch (e) {
            console.error("Critical: Could not log to DB:", e);
        }
    }

    try {
        const url = new URL(req.url);
        let body: any = null;
        try { body = await req.json(); } catch { body = {}; }

        // Sanitize string conversions to avoid ".match is not a function"
        const getParam = (name: string) => url.searchParams.get(name) || "";
        const getResource = () => {
            const res = url.searchParams.get("resource") || body?.resource;
            return typeof res === 'string' ? res : "";
        };

        let paymentId = getParam("data.id") || getParam("id");
        if (!paymentId && body?.data?.id) paymentId = String(body.data.id);
        if (!paymentId && body?.id) paymentId = String(body.id);

        if (!paymentId) {
            const resource = getResource();
            if (resource && resource.includes("/payments/")) {
                const match = resource.match(/\/payments\/(\d+)/);
                if (match?.[1]) paymentId = match[1];
            }
        }

        await logStep(paymentId, null, "init", "received", { query: url.search, body_type: typeof body });

        if (!paymentId) {
            console.log("Webhook without paymentId. Body:", JSON.stringify(body));
            return new Response(JSON.stringify({ ok: true, note: "No payment id" }), { status: 200, headers: corsHeaders });
        }

        // Fetch payment from MP
        const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
        });

        if (!mpRes.ok) {
            const errData = await mpRes.json().catch(() => ({}));
            await logStep(paymentId, null, "mp_verify", "failed", { status: mpRes.status }, errData);
            return new Response(JSON.stringify({ ok: false, error: "Cannot verify payment" }), { status: 200, headers: corsHeaders });
        }

        const payment = await mpRes.json();
        await logStep(paymentId, null, "mp_payment_fetch", "success", { status: payment.status });

        const externalReference = payment.external_reference;
        const metadataOrderId = payment.metadata?.orderId || payment.metadata?.order_id;

        let orderFindQuery = supabase.from("orders").select("*");
        if (externalReference) orderFindQuery = orderFindQuery.eq("external_reference", externalReference);
        else if (metadataOrderId) orderFindQuery = orderFindQuery.eq("id", metadataOrderId);
        else {
            await logStep(paymentId, null, "find_order", "skipped", { payment_status: payment.status, note: "No references found in metadata or external_ref" });
            return new Response(JSON.stringify({ ok: true, note: "No order reference" }), { status: 200, headers: corsHeaders });
        }

        const { data: order, error: orderErr } = await orderFindQuery.maybeSingle();

        if (orderErr || !order) {
            await logStep(paymentId, null, "find_order", "not_found", { externalReference, metadataOrderId }, orderErr);
            return new Response(JSON.stringify({ ok: true, note: "Order not found" }), { status: 200, headers: corsHeaders });
        }

        const orderId = order.id;
        await logStep(paymentId, orderId, "find_order", "success", { current_order_status: order.status });

        // Idempotency: skip if already approved and same payment ID
        if (order.status === "approved" && order.mp_payment_id === String(payment.id)) {
            await logStep(paymentId, orderId, "idempotency", "skipped", { note: "Already processed" });
            return new Response(JSON.stringify({ ok: true, note: "Already processed" }), { status: 200, headers: corsHeaders });
        }

        // Update order status
        await logStep(paymentId, orderId, "update_order_start", "attempting", { new_status: payment.status });
        const { error: updateErr } = await supabase.from("orders").update({
            status: payment.status,
            mp_payment_id: String(payment.id),
            mp_preference_id: payment.preference_id || order.mp_preference_id
        }).eq("id", orderId);

        if (updateErr) {
            await logStep(paymentId, orderId, "update_order", "error", null, updateErr);
        } else {
            await logStep(paymentId, orderId, "update_order", "success");
        }

        if (payment.status !== "approved") {
            await logStep(paymentId, orderId, "process_approval", "skipped", { status: payment.status });
            return new Response(JSON.stringify({ ok: true, order_id: orderId, status: payment.status }), { status: 200, headers: corsHeaders });
        }

        // Approval Logic
        const buyerEmail = order.buyer_email || order.email || payment.payer?.email;
        await logStep(paymentId, orderId, "process_approval", "start", { buyerEmail });

        if (!buyerEmail) {
            await logStep(paymentId, orderId, "get_email", "failed");
            return new Response(JSON.stringify({ ok: false, error: "No email found" }), { status: 200, headers: corsHeaders });
        }

        // Auth User Management
        await logStep(paymentId, orderId, "auth_management", "start", { buyerEmail });

        let userId = null;
        let isNewUser = false;
        let newPassword = "";

        // Strategy: First check profiles table
        const { data: profile } = await supabase.from("profiles").select("id").eq("email", buyerEmail).maybeSingle();

        if (profile?.id) {
            userId = profile.id;
            await logStep(paymentId, orderId, "find_user_profile", "existing", { userId });
        } else {
            await logStep(paymentId, orderId, "find_user_profile", "not_found");

            // Try to create the user directly
            newPassword = generateTempPassword();
            const { data: newUserObj, error: createError } = await supabase.auth.admin.createUser({
                email: buyerEmail,
                password: newPassword,
                email_confirm: true,
                user_metadata: { must_change_password: true }
            });

            if (createError) {
                if (createError.message?.includes("already registered") || createError.status === 422) {
                    await logStep(paymentId, orderId, "create_user", "already_registered_retry");
                    // If they are already registered but we didn't see a profile, maybe it's just sync lag.
                    // Wait a moment and check profile again? Or just try to get by email using listUsers if available?
                    // Actually, let's try profile again after a tiny delay
                    const { data: profileRetry } = await supabase.from("profiles").select("id").eq("email", buyerEmail).maybeSingle();
                    if (profileRetry?.id) {
                        userId = profileRetry.id;
                        await logStep(paymentId, orderId, "find_user_retry", "success", { userId });
                    } else {
                        await logStep(paymentId, orderId, "critical_error", "user_exists_but_no_profile_id");
                        return new Response(JSON.stringify({ ok: false, error: "User exists but ID unavailable" }), { status: 200, headers: corsHeaders });
                    }
                } else {
                    await logStep(paymentId, orderId, "create_user", "failed", null, createError);
                    return new Response(JSON.stringify({ ok: false, error: "Failed to create user", details: createError }), { status: 200, headers: corsHeaders });
                }
            } else if (newUserObj?.user?.id) {
                userId = newUserObj.user.id;
                isNewUser = true;
                await logStep(paymentId, orderId, "create_user", "success", { userId });
            }
        }

        // Grant Course Access
        const { error: accessErr } = await supabase.from("course_access").upsert({
            user_id: userId,
            course_id: order.course_id,
            active: true
        }, { onConflict: "user_id,course_id" });

        if (accessErr) await logStep(paymentId, orderId, "grant_access", "error", { course_id: order.course_id }, accessErr);
        else await logStep(paymentId, orderId, "grant_access", "success");

        // Fetch course details for email
        const { data: course } = await supabase.from("courses").select("slug, title").eq("id", order.course_id).maybeSingle();

        // Email Sending via Resend
        await logStep(paymentId, orderId, "send_email", "start", { hasKey: !!RESEND_API_KEY });
        let emailStatus = "sent";
        let emailError = null;
        let providerId = null;

        if (RESEND_API_KEY) {
            const courseUrl = `${APP_BASE_URL}/player/${course?.slug || order.course_id}`;
            const emailHtml = isNewUser ? `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
                    <h2>¡Tu acceso está listo!</h2>
                    <p>Has adquirido el curso: <strong>${course?.title || "Curso"}</strong></p>
                    <p>Tus credenciales de acceso temporal son:</p>
                    <ul style="background: #f4f4f4; padding: 20px; list-style: none;">
                      <li><strong>Email:</strong> ${buyerEmail}</li>
                      <li><strong>Contraseña temporal:</strong> ${newPassword}</li>
                    </ul>
                    <p><strong>Importante:</strong> Se te pedirá que cambies esta contraseña al ingresar por primera vez.</p>
                    <p style="text-align: center; margin-top: 30px;">
                        <a href="${courseUrl}" style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Ir al curso</a>
                    </p>
                </div>
            ` : `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
                    <h2>¡Tu acceso está listo!</h2>
                    <p>Se ha añadido el curso <strong>${course?.title || "Curso"}</strong> a tu cuenta existente.</p>
                    <p>Puedes acceder con tus credenciales habituales.</p>
                    <p style="text-align: center; margin-top: 30px;">
                        <a href="${courseUrl}" style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Ir al curso</a>
                    </p>
                </div>
            `;

            const resendRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
                body: JSON.stringify({ from: EMAIL_FROM, to: buyerEmail, subject: "Tus credenciales de acceso - AulaExpress", html: emailHtml })
            });

            const resendData = await resendRes.json().catch(() => null);
            if (!resendRes.ok) {
                emailStatus = "failed";
                emailError = resendData;
            } else {
                providerId = resendData?.id;
            }
        } else {
            emailStatus = "failed";
            emailError = "RESEND_API_KEY missing";
        }

        await logStep(paymentId, orderId, "send_email", emailStatus, { providerId }, emailError);

        // Final Logging
        await supabase.from("email_logs").insert({
            order_id: orderId,
            type: "credentials",
            to_email: buyerEmail,
            status: emailStatus,
            provider_id: providerId,
            error: emailError ? JSON.stringify(emailError) : null
        });

        return new Response(JSON.stringify({ ok: true, emailStatus }), { status: 200, headers: corsHeaders });

    } catch (err: any) {
        console.error("Webhook Fatal Error:", err);
        // Try to log the crash
        const supabase = createClient(Deno.env.get("SUPABASE_URL") || "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "");
        await supabase.from("webhook_logs").insert({
            step: "fatal_crash",
            status: "error",
            error: err?.message || String(err),
            data: { stack: err?.stack }
        }).catch(() => { });

        return new Response(JSON.stringify({ ok: false, error: "Webhook failed", details: err?.message }), { status: 500, headers: corsHeaders });
    }
});
