-- ==========================================
-- ESQUEMA DE BASE DE DATOS - CURSOS & ADMIN
-- ==========================================

-- 1. TABLA DE CURSOS
create table if not exists public.courses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  slug text unique not null,
  title text not null,
  subtitle text,
  description text,
  price numeric default 0,
  old_price numeric,
  category text,
  thumbnail text, -- URL de la imagen
  rating numeric default 5.0,
  students integer default 0,
  duration text,
  level text check (level in ('Básico', 'Intermedio', 'Avanzado')),
  modules jsonb default '[]'::jsonb, -- Estructura: [{ id, title, lessons: [] }]
  requirements text[] default '{}',
  target_audience text[] default '{}',
  benefits text[] default '{}',
  drive_link text -- Link a la carpeta de Google Drive con el contenido
);

-- Habilitar RLS en Courses
alter table public.courses enable row level security;

-- Política: Todo el mundo puede ver los cursos
drop policy if exists "Cursos públicos para ver" on public.courses;
create policy "Cursos públicos para ver" on public.courses for select using (true);

-- Política: Solo Admins pueden crear/editar/borrar cursos
drop policy if exists "Admins pueden gestionar cursos" on public.courses;
create policy "Admins pueden gestionar cursos"
  on public.courses
  for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );


-- 2. TABLA DE PERFILES (ADMINISTRADORES)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text default 'user',
  created_at timestamp with time zone default now()
);

-- Habilitar RLS en Profiles
alter table public.profiles enable row level security;

-- Política: Usuarios ven su propio perfil (necesario para verificar rol)
drop policy if exists "Usuarios ven su propio perfil" on public.profiles;
create policy "Usuarios ven su propio perfil" on public.profiles for select using (auth.uid() = id);


-- 3. TRIGGER PARA CREACIÓN AUTOMÁTICA DE ADMIN
-- Este trigger convierte automáticamente en ADMIN al usuario que se registre (o primer usuario)
-- NOTA: En producción, cambiarías 'admin' por 'user' y asignarías admins manualmente.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user'); -- Por seguridad, por defecto es 'user'. El admin debe promover manualmente.
  return new;
end;
$$ language plpgsql security definer;

-- Trigger que se dispara al crear usuario en Auth
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
