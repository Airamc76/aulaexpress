-- ==============================================================================
-- SCRIPT CONSOLIDADO DE GESTIÓN DE USUARIOS Y ADMIN (ADMIN PANEL FEATURES)
-- Ejecuta este script completo en el SQL Editor de Supabase para habilitar todas las funciones.
-- ==============================================================================

-- 1. HABILITAR EXTENSIONES NECESARIAS
-- Requerido para hashear contraseñas manualmente (pgcrypto)
create extension if not exists pgcrypto;

-- 2. FUNCIÓN: Obtener lista completa de usuarios con sus roles y estado 2FA
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

-- 3. FUNCIÓN: Eliminar usuario
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

-- 4. FUNCIÓN: Actualizar rol de usuario
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

-- 5. FUNCIÓN: Resetear 2FA (Eliminar factores MFA)
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

-- 6. FUNCIÓN: Crear usuario manualmente por Admin
create or replace function public.create_user_by_admin(new_email text, new_password text, new_role text)
returns void
security definer
as $$
declare
  new_id uuid;
begin
  -- Verificar permisos de admin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Acceso denegado: Solo administradores.';
  end if;

  -- Verificar si el usuario ya existe
  if exists (select 1 from auth.users where email = new_email) then
    raise exception 'El usuario ya existe';
  end if;

  new_id := gen_random_uuid();

  -- Insertar en auth.users
  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) values (
    '00000000-0000-0000-0000-000000000000',
    new_id,
    'authenticated',
    'authenticated',
    new_email,
    crypt(new_password, gen_salt('bf')), -- Hash de contraseña usando pgcrypto
    now(), -- Email confirmado automáticamente
    null,
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

  -- Asegurar que el perfil se cree con el rol correcto
  -- Intentamos update primero por si el trigger 'handle_new_user' ya corrió
  if exists (select 1 from public.profiles where id = new_id) then
      update public.profiles set role = new_role where id = new_id;
  else
      insert into public.profiles (id, email, role) values (new_id, new_email, new_role);
  end if;
  
end;
$$ language plpgsql;

-- 7. FUNCIÓN: Resetear contraseña por Admin
create or replace function public.update_user_password_by_admin(target_user_id uuid, new_password text)
returns void
security definer
as $$
begin
  -- Verificar permisos de admin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Acceso denegado';
  end if;

  update auth.users
  set encrypted_password = crypt(new_password, gen_salt('bf')),
      updated_at = now()
  where id = target_user_id;
end;
$$ language plpgsql;
