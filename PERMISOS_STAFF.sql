-- ===============================================================
-- 🚨 HABILITAR PERMISOS PARA STAFF (GESTIÓN DE CURSOS)
-- ===============================================================
-- Este script configura la base de datos para que el rol 'staff'
-- pueda Crear, Editar y Borrar cursos, pero NO usuarios.

-- 1. Habilitar seguridad nivel fila (RLS) en cursos
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- 2. Limpieza de políticas previas (para evitar duplicados o conflictos)
-- Borramos posibles políticas antiguas con nombres comunes
DROP POLICY IF EXISTS "Public read access" ON public.courses;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.courses;
DROP POLICY IF EXISTS "Enable insert for admins" ON public.courses;
DROP POLICY IF EXISTS "Enable update for admins" ON public.courses;
DROP POLICY IF EXISTS "Enable delete for admins" ON public.courses;
DROP POLICY IF EXISTS "Admin full access" ON public.courses;

-- 3. Crear Políticas Definidas

-- A) LECTURA: Todo el mundo (público) puede ver los cursos
CREATE POLICY "Public read access"
ON public.courses FOR SELECT
USING (true);

-- B) INSERTAR: Solo Admin y Staff
CREATE POLICY "Admin and Staff can insert"
ON public.courses FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.role = 'admin' OR profiles.role = 'staff')
  )
);

-- C) ACTUALIZAR: Solo Admin y Staff
CREATE POLICY "Admin and Staff can update"
ON public.courses FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.role = 'admin' OR profiles.role = 'staff')
  )
);

-- D) BORRAR: Solo Admin y Staff
CREATE POLICY "Admin and Staff can delete"
ON public.courses FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.role = 'admin' OR profiles.role = 'staff')
  )
);
