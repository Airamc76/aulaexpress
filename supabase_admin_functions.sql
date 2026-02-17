-- FUNCIONES ADMINISTRATIVAS PARA GESTIÓN DE USUARIOS
-- Estas funciones permiten al admin gestionar usuarios de la tabla auth desde el frontend
-- SE REQUIERE QUE EL ROL QUE EJECUTA ESTO TENGA PERMISOS DE SUPERUSER O BYPASS RLS EN AUTH (SECURITY DEFINER)

-- 1. Obtener lista completa de usuarios con sus roles
-- Combinamos la tabla de auth.users (para saber si tienen 2fa, last_sign_in, etc) con public.profiles
create or replace function public.get_all_users_data()
returns table (
  id uuid,
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
    au.id,
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

-- 2. Eliminar usuario (Borra de auth.users, lo que dispara cascada a profiles)
create or replace function public.delete_user_by_admin(target_user_id uuid)
returns void
security definer
as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Acceso denegado';
  end if;

  delete from auth.users where id = target_user_id;
end;
$$ language plpgsql;

-- 3. Actualizar rol de usuario
create or replace function public.update_user_role_by_admin(target_user_id uuid, new_role text)
returns void
security definer
as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Acceso denegado';
  end if;

  update public.profiles set role = new_role where id = target_user_id;
end;
$$ language plpgsql;

-- 4. Resetear 2FA (Eliminar factores MFA del usuario)
create or replace function public.reset_user_2fa_by_admin(target_user_id uuid)
returns void
security definer
as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Acceso denegado';
  end if;

  delete from auth.mfa_factors where user_id = target_user_id;
end;
$$ language plpgsql;

-- 5. Crear usuario manualmente (Esto es un wrapper para insertar en auth.users si fuera necesario, 
-- pero normalmente se usa supabase.auth.signUp. 
-- Como es complejo manejar hashing de contraseñas aquí, 
-- asumiremos que el admin crea usuarios invitándolos o usando una función cliente que luego el trigger maneja).
-- OMITIDO POR COMPLEJIDAD DE HASHING. El admin usará "Invite" o la UI de Supabase para crear, o implementaremos un "Crear" simple en el front que usa la API de cliente si se permite.

-- NOTA: Para que estas funciones funcionen, el rol de base de datos que las ejecuta (postgres o el definer) necesita permisos sobre auth.users.
-- En Supabase managed, 'postgres' tiene permisos. 'security definer' hace que se ejecute como el creador (postgres).
