-- ==============================================================================
-- 🚨 SCRIPT DE SOLUCIÓN FINAL (EJECUTAR TODO EN SUPABASE)
-- ==============================================================================
-- Este script arregla:
-- 1. El error "id is ambiguous" en el panel de usuarios.
-- 2. Habilita la función "Hard Reset 2FA" para solucionar el bloqueo del código QR.
-- 3. Habilita la creación y edición de usuarios.

-- Habilitar extensión de encriptación
create extension if not exists pgcrypto;

-- ------------------------------------------------------------------------------
-- 1. FUNCIÓN CORREGIDA: Obtener usuarios (Arregla error "id ambiguous")
-- ------------------------------------------------------------------------------
drop function if exists public.get_all_users_data();

create or replace function public.get_all_users_data()
returns table (
  user_id uuid, -- Nombre único corregido
  email text,
  role text,
  last_sign_in_at timestamp with time zone,
  created_at timestamp with time zone,
  is_2fa_enabled boolean
) 
security definer
as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Acceso denegado';
  end if;

  return query
  select 
    au.id as user_id, -- Alias vital para evitar error
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

-- ------------------------------------------------------------------------------
-- 2. FUNCIÓN: Hard Reset 2FA (Para desbloquear el QR)
-- ------------------------------------------------------------------------------
create or replace function public.reset_user_2fa_by_admin(target_user_id uuid)
returns void
security definer
as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Acceso denegado';
  end if;

  -- Borra TODOS los factores de autenticación del usuario (verified y unverified)
  delete from auth.mfa_factors where user_id = target_user_id;
end;
$$ language plpgsql;

-- ------------------------------------------------------------------------------
-- 3. OTRAS FUNCIONES ADMINISTRATIVAS (Crear, Borrar, Editar Rol)
-- ------------------------------------------------------------------------------

-- Eliminar usuario
create or replace function public.delete_user_by_admin(target_user_id uuid)
returns void security definer as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then raise exception 'Acceso denegado'; end if;
  delete from auth.users where id = target_user_id;
end;
$$ language plpgsql;

-- Actualizar rol
create or replace function public.update_user_role_by_admin(target_user_id uuid, new_role text)
returns void security definer as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then raise exception 'Acceso denegado'; end if;
  update public.profiles set role = new_role where id = target_user_id;
end;
$$ language plpgsql;

-- Crear usuario
create or replace function public.create_user_by_admin(new_email text, new_password text, new_role text)
returns void security definer as $$
declare new_id uuid;
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then raise exception 'Acceso denegado'; end if;
  if exists (select 1 from auth.users where email = new_email) then raise exception 'Usuario existe'; end if;
  
  new_id := gen_random_uuid();
  insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
  values ('00000000-0000-0000-0000-000000000000', new_id, 'authenticated', 'authenticated', new_email, crypt(new_password, gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now());
  
  if exists (select 1 from public.profiles where id = new_id) then
      update public.profiles set role = new_role where id = new_id;
  else
      insert into public.profiles (id, email, role) values (new_id, new_email, new_role);
  end if;
end;
$$ language plpgsql;

-- Cambiar contraseña
create or replace function public.update_user_password_by_admin(target_user_id uuid, new_password text)
returns void security definer as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then raise exception 'Acceso denegado'; end if;
  update auth.users set encrypted_password = crypt(new_password, gen_salt('bf')), updated_at = now() where id = target_user_id;
end;
$$ language plpgsql;
