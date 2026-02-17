-- ==========================================
-- SCRIPT DE REPARACIÓN DEFINITIVA (Admin Panel)
-- ==========================================

-- 1. Eliminar función antigua para evitar conflictos
drop function if exists public.get_all_users_data();

-- 2. Re-crear función con corrección de nombres (user_id)
create or replace function public.get_all_users_data()
returns table (
  user_id uuid, -- Nombre inequívoco
  email text,
  role text,
  last_sign_in_at timestamp with time zone,
  created_at timestamp with time zone,
  is_2fa_enabled boolean
) 
security definer
as $$
begin
  -- Verificar si es admin consultando la tabla profiles
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Acceso denegado: Solo administradores.';
  end if;

  return query
  select 
    au.id as user_id, -- Alias explicito
    au.email::text,
    coalesce(pp.role, 'user'),
    au.last_sign_in_at,
    au.created_at,
    -- Verificar si existe un factor verificado para este usuario
    exists (select 1 from auth.mfa_factors am where am.user_id = au.id and am.status = 'verified') as is_2fa_enabled
  from auth.users au
  left join public.profiles pp on pp.id = au.id
  order by au.created_at desc;
end;
$$ language plpgsql;
