-- Tabla para debuggear webhooks
CREATE TABLE IF NOT EXISTS public.webhook_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    payment_id text,
    order_id uuid,
    step text,
    status text,
    data jsonb,
    error text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view webhook logs" ON public.webhook_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

NOTIFY pgrst, 'reload schema';
