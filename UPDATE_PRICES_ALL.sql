BEGIN;

-- 1. Actualizar todos los cursos (excepto test webhook) a 5.499
UPDATE public.courses
SET price = 5.499
WHERE slug != 'curso-test-webhook';

-- 2. Asegurar que el curso test webhook cueste 100
UPDATE public.courses
SET price = 100
WHERE slug = 'curso-test-webhook';

COMMIT;
