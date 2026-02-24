// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
};

serve(async (req) => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

    try {
        if (req.method !== "POST") return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

        const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
        const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
        const MP_ACCESS_TOKEN = Deno.env.get("MP_ACCESS_TOKEN") || "";
        const MP_WEBHOOK_URL = Deno.env.get("MP_WEBHOOK_URL") || ""; // We will use notification_url
        const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || Deno.env.get("PUBLIC_APP_URL") || "";

        const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
        const body = await req.json();

        const { courseId, email } = body;

        if (!courseId || !email) {
            return new Response(JSON.stringify({ ok: false, error: "Missing courseId or email" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        // Validate course
        const { data: course, error: courseErr } = await supabase
            .from("courses")
            .select("id, title, price")
            .eq("id", courseId)
            .maybeSingle();

        if (courseErr || !course) {
            return new Response(JSON.stringify({ ok: false, error: "Course not found", details: courseErr?.message }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        // External reference
        const timestamp = Date.now();
        const rand = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        const external_reference = `course:${courseId}|email:${email}|ts:${timestamp}|rand:${rand}`;

        // Create pending order
        const { data: order, error: orderErr } = await supabase
            .from("orders")
            .insert({
                email: email,
                course_id: course.id,
                status: "pending",
                external_reference: external_reference
            })
            .select("id")
            .single();

        if (orderErr || !order) {
            return new Response(JSON.stringify({ ok: false, error: "Could not create order", details: orderErr?.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        // Create Mercado Pago Preference
        const preferencePayload: any = {
            items: [
                {
                    title: course.title,
                    quantity: 1,
                    unit_price: Number(course.price),
                    currency_id: "ARS",
                },
            ],
            payer: {
                email: email,
            },
            external_reference: external_reference,
            metadata: {
                courseId: course.id,
                email: email,
                orderId: order.id,
            },
            back_urls: {
                success: `${APP_BASE_URL}/payment/success`,
                failure: `${APP_BASE_URL}/payment/failure`,
                pending: `${APP_BASE_URL}/payment/pending`,
            },
            auto_return: "approved",
        };

        if (MP_WEBHOOK_URL) {
            // e.g., https://your-project.supabase.co/functions/v1/mp-webhook
            preferencePayload.notification_url = MP_WEBHOOK_URL;
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
            return new Response(JSON.stringify({ ok: false, error: "Mercado Pago preference error", mp: mpJson }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        // Update order with preference id
        await supabase.from("orders").update({ mp_preference_id: mpJson.id }).eq("id", order.id);

        const initPoint = MP_ACCESS_TOKEN.startsWith("TEST-") ? mpJson?.sandbox_init_point : mpJson?.init_point;

        return new Response(JSON.stringify({
            ok: true,
            orderId: order.id,
            init_point: initPoint,
        }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    } catch (err: any) {
        return new Response(JSON.stringify({ ok: false, error: "Unhandled error", details: err?.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
});
