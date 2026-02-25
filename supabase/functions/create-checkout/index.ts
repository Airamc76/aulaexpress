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
        if (req.method !== "POST") return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), { status: 405, headers: corsHeaders });

        const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
        const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
        const MP_ACCESS_TOKEN = Deno.env.get("MP_ACCESS_TOKEN") || "";
        const MP_WEBHOOK_URL = Deno.env.get("MP_WEBHOOK_URL") || "";
        const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || Deno.env.get("PUBLIC_APP_URL") || "";

        const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
        const body = await req.json();
        const { courseId, email } = body;

        if (!courseId || !email) {
            return new Response(JSON.stringify({ ok: false, error: "Faltan datos: courseId o email" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const { data: course, error: courseErr } = await supabase
            .from("courses")
            .select("id, title, price")
            .eq("id", courseId)
            .maybeSingle();

        if (courseErr) {
            return new Response(JSON.stringify({ ok: false, error: "Error DB al buscar curso", details: courseErr.message }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        if (!course) {
            return new Response(JSON.stringify({ ok: false, error: `Curso no encontrado con ID: ${courseId}` }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const external_reference = `course:${courseId}|email:${email}|ts:${Date.now()}`;

        // Intentamos insertar con amount_ars y amounts_ars por si existen en la tabla (visto en logs de error)
        const { data: order, error: orderErr } = await supabase
            .from("orders")
            .insert({
                buyer_email: email,
                course_id: course.id,
                amount_ars: Number(course.price),   // Añadido para evitar error de NOT NULL
                amounts_ars: Number(course.price),  // Añadido por precaución
                status: "pending",
                external_reference: external_reference
            })
            .select("id")
            .single();

        if (orderErr) {
            // Si falla por columna inexistente (lo cual sería raro tras el fix anterior, pero por si acaso), 
            // reintentamos sin esas columnas o devolvemos el error real.
            return new Response(JSON.stringify({ ok: false, error: "Error al crear la orden", details: orderErr.message }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: [{ title: course.title, quantity: 1, unit_price: Number(course.price), currency_id: "ARS" }],
                payer: { email: email },
                external_reference: external_reference,
                metadata: { courseId: course.id, email: email, orderId: order.id },
                back_urls: {
                    success: `${APP_BASE_URL}/payment/success`,
                    failure: `${APP_BASE_URL}/payment/failure`,
                    pending: `${APP_BASE_URL}/payment/pending`,
                },
                auto_return: "approved",
                notification_url: MP_WEBHOOK_URL
            }),
        });

        const mpJson = await mpRes.json().catch(() => ({}));

        if (!mpRes.ok) {
            return new Response(JSON.stringify({ ok: false, error: "Error con Mercado Pago", mp: mpJson }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        await supabase.from("orders").update({ mp_preference_id: mpJson.id }).eq("id", order.id);

        const initPoint = MP_ACCESS_TOKEN.startsWith("TEST-") ? mpJson?.sandbox_init_point : mpJson?.init_point;

        return new Response(JSON.stringify({ ok: true, orderId: order.id, init_point: initPoint }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    } catch (err: any) {
        return new Response(JSON.stringify({ ok: false, error: "Error fatal en la función", details: err?.message }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
});
