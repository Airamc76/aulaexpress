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
        const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
        const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
        const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

        const url = new URL(req.url);
        const action = url.searchParams.get("action");
        if (action === "reset") {
            await supabase.from("orders").update({ status: "pending", mp_payment_id: null }).filter("buyer_email", "eq", "rubeni@tiforbi.com");
            return new Response(JSON.stringify({ ok: true, message: "Order reset" }), { status: 200, headers: corsHeaders });
        }

        const { data: logs } = await supabase.from("webhook_logs").select("*").order("created_at", { ascending: false }).limit(30);
        const { data: fatalLogs } = await supabase.from("webhook_logs").select("*").eq("step", "fatal_crash").order("created_at", { ascending: false }).limit(5);
        const { data: emailLogs } = await supabase.from("email_logs").select("*").order("created_at", { ascending: false }).limit(20);
        const { data: access } = await supabase.from("course_access").select("*").order("created_at", { ascending: false }).limit(20);

        return new Response(JSON.stringify({
            ok: true,
            logs,
            fatalLogs,
            emailLogs,
            access,
            env: {
                hasMP: !!Deno.env.get("MP_ACCESS_TOKEN"),
                hasResend: !!Deno.env.get("RESEND_API_KEY"),
                mpPrefix: Deno.env.get("MP_ACCESS_TOKEN")?.substring(0, 10),
                mpLength: Deno.env.get("MP_ACCESS_TOKEN")?.length,
                appBaseUrl: Deno.env.get("APP_BASE_URL")
            }
        }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    } catch (err: any) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500, headers: corsHeaders });
    }
});
