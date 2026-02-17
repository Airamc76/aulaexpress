-- ===============================================================
-- REPARACIÓN FINAL DE IMÁGENES RESTANTES
-- ===============================================================

-- 1. Biblioteca: 100 Libros de Ciberseguridad (Nueva imagen de Matrix/Hacking)
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop'
WHERE slug = '100-libros-ciberseguridad';

-- 2. Pack Definitivo para Diseñadores (Nueva imagen de espacio creativo)
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'pack-completo-disenadores';

-- Asegurar que el precio esté correcto también en estos dos
UPDATE public.courses 
SET price = 5000 
WHERE slug IN ('100-libros-ciberseguridad', 'pack-completo-disenadores');
