-- ===============================================================
-- ACTUALIZACIÓN: LENGUAJE Y STORAGE PARA CURSOS
-- ===============================================================

-- 1. Agregar columna 'language' a la tabla courses
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS language text DEFAULT 'Español';

-- 2. Crear Bucket de Storage para imágenes de cursos
-- Nota: Esto usualmente se hace desde la UI, pero intentaremos asegurarlo por SQL si es posible
-- o simplemente configurar las políticas asumiendo que el bucket se llama 'course-thumbnails'.

insert into storage.buckets (id, name, public)
values ('course-thumbnails', 'course-thumbnails', true)
on conflict (id) do nothing;

-- 3. Políticas de Storage para 'course-thumbnails'

-- A) LECTURA: Pública
create policy "Public Access to Course Thumbnails"
on storage.objects for select
using ( bucket_id = 'course-thumbnails' );

-- B) SUBIDA: Solo Admin y Staff
create policy "Admin and Staff can Upload Thumbnails"
on storage.objects for insert
with check (
  bucket_id = 'course-thumbnails' 
  AND auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.role = 'admin' OR profiles.role = 'staff')
  )
);

-- C) ACTUALIZAR: Solo Admin y Staff
create policy "Admin and Staff can Update Thumbnails"
on storage.objects for update
using (
  bucket_id = 'course-thumbnails' 
  AND auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.role = 'admin' OR profiles.role = 'staff')
  )
);

-- D) BORRAR: Solo Admin y Staff
create policy "Admin and Staff can Delete Thumbnails"
on storage.objects for delete
using (
  bucket_id = 'course-thumbnails' 
  AND auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND (profiles.role = 'admin' OR profiles.role = 'staff')
  )
);
