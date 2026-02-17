-- ===============================================================
-- REPARACIÓN DE IMÁGENES FALTANTES (PEXELS ALTERNATIVAS)
-- ===============================================================

-- 1. Pack Definitivo para Diseñadores
-- Imagen de mesa de trabajo creativa
UPDATE public.courses 
SET thumbnail = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = 'pack-completo-disenadores';

-- 2. Biblioteca: 620+ Libros de Emprendimiento
-- Imagen de libros/biblioteca moderna
UPDATE public.courses 
SET thumbnail = 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = '620-libros-emprendimiento';

-- 3. Diseño de Interfaces UX/UI
-- Imagen de wireframing/diseño digital
UPDATE public.courses 
SET thumbnail = 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = 'diseno-interfaces-ux-ui';

-- 4. Biblioteca: 100 Libros de Ciberseguridad
-- Imagen de código/seguridad
UPDATE public.courses 
SET thumbnail = 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = '100-libros-ciberseguridad';

-- Asegurar precio correcto
UPDATE public.courses 
SET price = 5000 
WHERE slug IN ('pack-completo-disenadores', '620-libros-emprendimiento', 'diseno-interfaces-ux-ui', '100-libros-ciberseguridad');
