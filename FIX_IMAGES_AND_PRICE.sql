-- ===============================================================
-- 1. ACTUALIZACIÓN MASIVA DE PRECIOS
-- ===============================================================
UPDATE public.courses
SET price = 5000;

-- ===============================================================
-- 2. CORRECCIÓN DE IMÁGENES ROTAS (Nuevas URLs Estables)
-- ===============================================================

-- Curso de Diseño Gráfico Completo
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1626785774573-4b799314348d?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'diseno-grafico-completo';

-- Diseño de Interfaces UX/UI
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'diseno-interfaces-ux-ui';

-- Pack Definitivo para Diseñadores
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'pack-completo-disenadores';

-- Realización de Tesis con ChatGPT
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'tesis-con-chatgpt';

-- Tutorial Completo de CapCut
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'tutorial-capcut-completo';

-- Python de 0 a Experto (Por si acaso)
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'python-0-a-experto';

-- Economía Digital: Cripto y Trading (Por si acaso)
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'economia-digital-trading';

-- Curso Completo de Logística (Por si acaso)
UPDATE public.courses 
SET thumbnail = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'curso-logistica-libros';
