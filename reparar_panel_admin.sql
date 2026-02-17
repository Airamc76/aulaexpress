-- ===============================================================
-- SOLUCIÓN FINAL: EJECUTAR ESTO EN SQL EDITOR DE SUPABASE
-- ===============================================================

-- 1. Eliminar la función defectuosa anterior
DROP FUNCTION IF EXISTS public.get_all_users_data();

-- 2. Crear la función corregida (usa 'user_id' para evitar errores)
CREATE OR REPLACE FUNCTION public.get_all_users_data()
RETURNS TABLE (
  user_id uuid, -- Nombre único para evitar el error "ambiguous"
  email text,
  role text,
  last_sign_in_at timestamp with time zone,
  created_at timestamp with time zone,
  is_2fa_enabled boolean
) 
SECURITY DEFINER
AS $$
BEGIN
  -- Verificar que el usuario sea administrador
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Acceso denegado: Solo administradores.';
  END IF;

  RETURN QUERY
  SELECT 
    au.id AS user_id, -- AQUÍ ESTÁ LA CORRECCIÓN CLAVE
    au.email::text,
    COALESCE(pp.role, 'user'),
    au.last_sign_in_at,
    au.created_at,
    EXISTS (SELECT 1 FROM auth.mfa_factors am WHERE am.user_id = au.id AND am.status = 'verified') AS is_2fa_enabled
  FROM auth.users au
  LEFT JOIN public.profiles pp ON pp.id = au.id
  ORDER BY au.created_at DESC;
END;
$$ LANGUAGE plpgsql;
