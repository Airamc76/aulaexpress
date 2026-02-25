-- Corrige la tabla orders añadiendo las columnas que falten
-- (Por si la tabla ya existía de antes sin estas columnas)

DO $$ 
BEGIN
    -- Añadir buyer_email si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='buyer_email') THEN
        ALTER TABLE public.orders ADD COLUMN buyer_email text;
    END IF;

    -- Añadir mp_preference_id si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='mp_preference_id') THEN
        ALTER TABLE public.orders ADD COLUMN mp_preference_id text;
    END IF;

    -- Añadir mp_payment_id si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='mp_payment_id') THEN
        ALTER TABLE public.orders ADD COLUMN mp_payment_id text;
        ALTER TABLE public.orders ADD CONSTRAINT orders_mp_payment_id_key UNIQUE (mp_payment_id);
    END IF;

    -- Añadir external_reference si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='external_reference') THEN
        ALTER TABLE public.orders ADD COLUMN external_reference text;
        ALTER TABLE public.orders ADD CONSTRAINT orders_external_reference_key UNIQUE (external_reference);
    END IF;
END $$;

-- Asegurar que la columna buyer_email tenga datos si existía una columna 'email' antigua
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='email') 
       AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='buyer_email') THEN
        UPDATE public.orders SET buyer_email = email WHERE buyer_email IS NULL;
    END IF;
END $$;

-- Recargar el cache de PostgREST (opcional, pero ayuda)
NOTIFY pgrst, 'reload schema';
