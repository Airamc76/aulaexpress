-- ===============================================================
-- ACTUALIZACIÓN V3: AGREGAR COLUMN 'updated_at'
-- ===============================================================

-- 1. Agregar columna 'updated_at' a la tabla courses
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- 2. (Opcional pero recomendado) Crear función y trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_courses_updated_at ON public.courses;

CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at_column();
