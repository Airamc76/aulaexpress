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
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
        const EMAIL_FROM = Deno.env.get("EMAIL_FROM") || "onboarding@resend.dev";
        const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || "";

        const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

        // Auth Check
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return new Response(JSON.stringify({ ok: false, error: "Missing authorization" }), { status: 401, headers: corsHeaders });
        }

        const { data: userData, error: userError } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
        if (userError || !userData?.user) {
            return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), { status: 401, headers: corsHeaders });
        }

        // Admins only
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", userData.user.id).single();
        if (profile?.role !== "admin") {
            return new Response(JSON.stringify({ ok: false, error: "Forbidden: Admins only" }), { status: 403, headers: corsHeaders });
        }

        const body = await req.json().catch(() => ({}));
        const { orderId } = body;

        if (!orderId) {
            return new Response(JSON.stringify({ ok: false, error: "Missing orderId" }), { status: 400, headers: corsHeaders });
        }

        // Use buyer_email from schema
        const { data: order, error: orderErr } = await supabase
            .from("orders")
            .select("id, buyer_email, course_id, status")
            .eq("id", orderId)
            .maybeSingle();

        if (orderErr || !order) {
            return new Response(JSON.stringify({ ok: false, error: "Order not found" }), { status: 404, headers: corsHeaders });
        }

        if (order.status !== "approved") {
            return new Response(JSON.stringify({ ok: false, error: "Order is not approved" }), { status: 400, headers: corsHeaders });
        }

        const { data: course } = await supabase.from("courses").select("slug, title").eq("id", order.course_id).maybeSingle();

        const buyerEmail = order.buyer_email;

        // Find User
        const { data: existingUserObj } = await supabase.auth.admin.getUserByEmail(buyerEmail);
        const targetUserId = existingUserObj?.user?.id;

        if (!targetUserId) {
            return new Response(JSON.stringify({ ok: false, error: "User for order email not found in auth" }), { status: 404, headers: corsHeaders });
        }

        // Reset password
        const newPassword = generateTempPassword();
        await supabase.auth.admin.updateUserById(targetUserId, { password: newPassword, user_metadata: { must_change_password: true } });

        // Send email via Resend
        let emailStatus = "sent";
        let emailError = null;
        let providerId = null;

        if (RESEND_API_KEY) {
            const courseUrl = `${APP_BASE_URL}/player/${course?.slug || order.course_id}`;
            const emailHtml = `
        <h2>Reenvío de tus credenciales de acceso</h2>
        <p>A pedido del administrador, estas son tus nuevas credenciales para el curso: <strong>${course?.title || "Curso"}</strong></p>
        <ul>
          <li>Email: ${buyerEmail}</li>
          <li>Contraseña temporal: <strong>${newPassword}</strong></li>
        </ul>
        <p><strong>Importante:</strong> Se te pedirá que cambies esta contraseña al ingresar.</p>
        <p><a href="${courseUrl}">Ir al curso</a></p>
      `;

            const resendRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${RESEND_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: EMAIL_FROM,
                    to: buyerEmail,
                    subject: "Tus nuevas credenciales de acceso - AulaExpress",
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
            type: "credentials_resend",
            to_email: buyerEmail,
            status: emailStatus,
            provider_id: providerId,
            error: emailError
        });

        return new Response(JSON.stringify({ ok: true, emailStatus, error: emailError }), { status: 200, headers: corsHeaders });

    } catch (err: any) {
        return new Response(JSON.stringify({ ok: false, error: "Unhandled error", details: err?.message }), { status: 500, headers: corsHeaders });
    }
});
