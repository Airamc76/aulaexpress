-- ===============================================================
-- MIGRACIÓN: TABLA DE COMPRAS (PURCHASES)
-- ===============================================================

-- 1. Crear tabla de compras
CREATE TABLE IF NOT EXISTS public.purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, course_id) -- Evitar compras duplicadas
);

-- 2. Habilitar RLS
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- 3. Políticas RLS

-- A) Usuarios pueden ver sus propias compras
DROP POLICY IF EXISTS "Users can view own purchases" ON public.purchases;
CREATE POLICY "Users can view own purchases"
ON public.purchases FOR SELECT
USING (auth.uid() = user_id);

-- B) Admins pueden ver todas las compras
DROP POLICY IF EXISTS "Admins can view all purchases" ON public.purchases;
CREATE POLICY "Admins can view all purchases"
ON public.purchases FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- C) Insertar compras (Permitir a service_role o usuario autenticado bajo ciertas condiciones, 
-- pero para este flujo simple, dejaremos que se inserten vía RPC o direct policy si el usuario se acaba de crear)
-- Para simplificar, permitiremos INSERT a cualquiera autenticado (el flujo de compra lo controla el frontend/backend)
DROP POLICY IF EXISTS "Users can insert own purchases" ON public.purchases;
CREATE POLICY "Users can insert own purchases"
ON public.purchases FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- OJO: Si usamos Service Role desde el cliente (no recomendado) o una Edge Function, esto cambia.
-- Para este prototipo, crearemos una RPC que se ejecute con SECURITY DEFINER para gestionar la compra "mágica".

-- 4. Función RPC para registrar compra (y crear usuario si no existe - NO, Auth debe ser aparte)
-- Haremos una función para "Registrar Compra" que asume que el user_id ya existe.

CREATE OR REPLACE FUNCTION public.register_purchase(target_course_id uuid, target_user_id uuid)
RETURNS void
SECURITY DEFINER
AS $$
BEGIN
  -- Verificar que el usuario existe en auth.users antes de intentar insertar
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = target_user_id) THEN
    RAISE EXCEPTION 'Usuario con ID % no encontrado en auth.users', target_user_id;
  END IF;

  INSERT INTO public.purchases (user_id, course_id)
  VALUES (target_user_id, target_course_id)
  ON CONFLICT (user_id, course_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql;
