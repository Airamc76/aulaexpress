-- ===============================================================
-- MIGRACIÓN: MERCADO PAGO INTEGRATION (Orders, Access, Email Logs)
-- ===============================================================

-- 1. TABLA: orders
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_email text NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE SET NULL,
  status text DEFAULT 'pending' NOT NULL,
  mp_preference_id text,
  mp_payment_id text UNIQUE,
  external_reference text UNIQUE,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Habilitar RLS en orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Política: Solo Admins pueden leer todas las órdenes
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
CREATE POLICY "Admins can view all orders"
ON public.orders FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Política: Usuarios pueden leer sus propias órdenes por email (si estuviera asociado a auth, pero como es email suelto, lo restringimos o lo dejamos por email si coincide con el usuario logueado en profiles)
DROP POLICY IF EXISTS "Users can view own orders by email" ON public.orders;
CREATE POLICY "Users can view own orders by email"
ON public.orders FOR SELECT
USING (
  buyer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);


-- 2. TABLA: course_access
CREATE TABLE IF NOT EXISTS public.course_access (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id, course_id)
);

-- Habilitar RLS en course_access
ALTER TABLE public.course_access ENABLE ROW LEVEL SECURITY;

-- Política: Usuarios ven sus propios accesos
DROP POLICY IF EXISTS "Users can view own access" ON public.course_access;
CREATE POLICY "Users can view own access"
ON public.course_access FOR SELECT
USING (auth.uid() = user_id);

-- Política: Admins ven todos los accesos
DROP POLICY IF EXISTS "Admins can view all accesses" ON public.course_access;
CREATE POLICY "Admins can view all accesses"
ON public.course_access FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);


-- 3. TABLA: email_logs
CREATE TABLE IF NOT EXISTS public.email_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  type text NOT NULL, -- e.g., 'credentials'
  to_email text NOT NULL,
  status text NOT NULL, -- 'sent', 'failed'
  provider_id text,
  error text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Habilitar RLS en email_logs
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Política: Solo Admins pueden leer email logs
DROP POLICY IF EXISTS "Admins can view email logs" ON public.email_logs;
CREATE POLICY "Admins can view email logs"
ON public.email_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);
