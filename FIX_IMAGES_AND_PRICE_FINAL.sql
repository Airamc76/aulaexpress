-- ===============================================================
-- 1. ACTUALIZACIÓN MASIVA DE PRECIOS
-- ===============================================================
UPDATE public.courses
SET price = 5000;

-- ===============================================================
-- 2. CORRECCIÓN DE IMÁGENES ROTAS (Último Intento)
-- ===============================================================

-- Curso de Diseño Gráfico Completo
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'diseno-grafico-completo';

-- Pack: 2000 Audiolibros
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'pack-2000-audiolibros';

-- Curso Práctico de ChatGPT
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'curso-practico-chatgpt';

-- Diseño de Interfaces UX/UI (Por si acaso)
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'diseno-interfaces-ux-ui';

-- Pack Definitivo para Diseñadores (Por si acaso)
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1626785774573-4b799314348d?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'pack-completo-disenadores';

-- Realización de Tesis con ChatGPT (Por si acaso)
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'tesis-con-chatgpt';

-- Tutorial Completo de CapCut (Por si acaso)
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'tutorial-capcut-completo';
