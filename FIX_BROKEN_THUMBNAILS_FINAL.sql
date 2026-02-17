-- ===============================================================
-- REPARACIÓN DEFINITIVA DE PORTADAS FALTANTES (Facebook Ads, Ciberseguridad, Diseñadores)
-- ===============================================================

-- 1. Facebook Ads Desde 0: Domina la Publicidad
-- Imagen: Estrategia digital / Marketing
UPDATE public.courses 
SET thumbnail = 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = 'facebook-ads-desde-0';

-- 2. Biblioteca: 100 Libros de Ciberseguridad
-- Imagen: Hacker / Código Matrix verde
UPDATE public.courses 
SET thumbnail = 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = '100-libros-ciberseguridad';

-- 3. Pack Definitivo para Diseñadores
-- Imagen: Espacio de trabajo creativo / Diseño
UPDATE public.courses 
SET thumbnail = 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = 'pack-completo-disenadores';

-- 4. Curso de Diseño Gráfico Completo (Por seguridad, ya que estaba cerca en la lista)
-- Imagen: Paleta de colores / Diseño
UPDATE public.courses 
SET thumbnail = 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = 'diseno-grafico-completo';

-- 5. Tutorial Completo de CapCut (Por seguridad)
-- Imagen: Edición de video móvil
UPDATE public.courses 
SET thumbnail = 'https://images.pexels.com/photos/403495/pexels-photo-403495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = 'tutorial-capcut-completo';

-- Asegurar precio correcto ($5000)
UPDATE public.courses 
SET price = 5000 
WHERE slug IN (
  'facebook-ads-desde-0', 
  '100-libros-ciberseguridad', 
  'pack-completo-disenadores',
  'diseno-grafico-completo',
  'tutorial-capcut-completo'
);
