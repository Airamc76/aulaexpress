-- ===============================================================
-- 🚨 EJECUTAR ESTO EN SUPABASE > SQL EDITOR
-- ===============================================================
-- Esto soluciona el error "column reference role is ambiguous"
-- renombrando la columna conflictiva a "user_role".

DROP FUNCTION IF EXISTS public.get_all_users_data();

CREATE OR REPLACE FUNCTION public.get_all_users_data()
RETURNS TABLE (
  user_id uuid,
  email text,
  user_role text, -- RENOMBRADO para evitar conflicto
  last_sign_in_at timestamp with time zone,
  created_at timestamp with time zone,
  is_2fa_enabled boolean
) 
SECURITY DEFINER
AS $$
BEGIN
  -- Verificar permisos de admin
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Acceso denegado';
  END IF;

  RETURN QUERY
  SELECT 
    au.id AS user_id,
    au.email::text,
    COALESCE(pp.role, 'user') AS user_role, -- Alias explícito
    au.last_sign_in_at,
    au.created_at,
    EXISTS (SELECT 1 FROM auth.mfa_factors am WHERE am.user_id = au.id AND am.status = 'verified') AS is_2fa_enabled
  FROM auth.users au
  LEFT JOIN public.profiles pp ON pp.id = au.id
  ORDER BY au.created_at DESC;
END;
$$ LANGUAGE plpgsql;
