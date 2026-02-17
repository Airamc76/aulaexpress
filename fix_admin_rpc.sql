-- CORRECCIÓN DEFINITIVA DE ERROR "id is ambiguous"
-- Ejecuta esto en Supabase para arreglar el panel de usuarios

drop function if exists public.get_all_users_data();

create or replace function public.get_all_users_data()
returns table (
  user_id uuid, -- Renombrado para evitar conflictos
  email text,
  role text,
  last_sign_in_at timestamp with time zone,
  created_at timestamp with time zone,
  is_2fa_enabled boolean
) 
security definer
as $$
begin
  -- Solo permitir a admins ejecutar esto
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Acceso denegado: Solo administradores.';
  end if;

  return query
  select 
    au.id as user_id,
    au.email::text,
    coalesce(pp.role, 'user'),
    au.last_sign_in_at,
    au.created_at,
    exists (select 1 from auth.mfa_factors am where am.user_id = au.id and am.status = 'verified') as is_2fa_enabled
  from auth.users au
  left join public.profiles pp on pp.id = au.id
  order by au.created_at desc;
end;
$$ language plpgsql;
