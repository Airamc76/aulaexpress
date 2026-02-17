-- ===============================================================
-- MIGRACIÓN: TABLA DE ÓRDENES (ORDERS) PARA MERCADO PAGO
-- ===============================================================

CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,

  course_id uuid REFERENCES public.courses(id) ON DELETE SET NULL,
  course_slug text,

  buyer_email text NOT NULL,

  amount_ars numeric NOT NULL DEFAULT 0,
  amounts_ars numeric NOT NULL DEFAULT 0,

  status text DEFAULT 'created' NOT NULL,
  mp_payment_id text,
  mp_status_detail text,
  mp_raw jsonb
);

-- Si la tabla ya existía, aseguramos columnas (idempotente)
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now() NOT NULL;
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now() NOT NULL;
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS course_id uuid;
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS course_slug text;
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS buyer_email text;
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS amount_ars numeric NOT NULL DEFAULT 0;
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS amounts_ars numeric NOT NULL DEFAULT 0;
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'created' NOT NULL;
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS mp_payment_id text;
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS mp_status_detail text;
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS mp_raw jsonb;

-- Asegurar FK (no existe IF NOT EXISTS para FK en todas las versiones; intentamos de forma segura)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'orders_course_id_fkey'
  ) THEN
    ALTER TABLE public.orders
      ADD CONSTRAINT orders_course_id_fkey
      FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS orders_buyer_email_idx ON public.orders (buyer_email);
CREATE INDEX IF NOT EXISTS orders_course_slug_idx ON public.orders (course_slug);
CREATE INDEX IF NOT EXISTS orders_amount_ars_idx ON public.orders (amount_ars);
CREATE INDEX IF NOT EXISTS orders_amounts_ars_idx ON public.orders (amounts_ars);
CREATE INDEX IF NOT EXISTS orders_status_idx ON public.orders (status);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Nota: sin policies por ahora.
-- La app no debería leer/escribir orders directo desde el cliente.
-- Las Edge Functions usan service_role y bypass RLS.

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_set_updated_at ON public.orders;
CREATE TRIGGER orders_set_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE PROCEDURE public.set_updated_at();
