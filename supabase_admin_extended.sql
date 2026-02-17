-- EXTENSIÓN PARA GESTIÓN AVANZADA DE USUARIOS (CREAR Y RESETEAR PASSWORD)
-- Requiere la extensión pgcrypto para hashear contraseñas
create extension if not exists pgcrypto;

-- 6. Crear usuario por admin
-- Inserta directamente en auth.users y actualiza el rol en profiles
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
    crypt(new_password, gen_salt('bf')), -- Hash de contraseña
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

  -- El trigger handle_new_user se ejecutará y creará el perfil con rol 'user'.
  -- Nosotros forzamos la actualización al rol deseado inmediatamente.
  -- Esperamos un pequeño momento o confiamos en la transacción. En PG es transaccional.
  -- Sin embargo, el trigger se dispara AFTER INSERT. Así que la fila en profiles ya debería existir antes de que termine esta función? 
  -- Sí, en la misma transacción. Pero para estar seguros, hacemos update direct.
  
  -- Nota: Si el trigger falla o no existe, insertamos manualmente.
  if exists (select 1 from public.profiles where id = new_id) then
      update public.profiles set role = new_role where id = new_id;
  else
      insert into public.profiles (id, email, role) values (new_id, new_email, new_role);
  end if;
  
end;
$$ language plpgsql;

-- 7. Resetear contraseña por admin
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
