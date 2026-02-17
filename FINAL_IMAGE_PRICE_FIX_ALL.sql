-- ===============================================================
-- FIX FINAL: PRECIOS + THUMBNAILS (UNIFICADO)
-- ===============================================================

BEGIN;

-- 1) PRECIO ÚNICO
UPDATE public.courses
SET price = 5000;

-- 2) THUMBNAILS (1 por slug)

-- PEXELS (prioridad por estabilidad)
UPDATE public.courses SET thumbnail = 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = 'facebook-ads-desde-0';

UPDATE public.courses SET thumbnail = 'https://images.pexels.com/photos/403495/pexels-photo-403495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = 'tutorial-capcut-completo';

UPDATE public.courses SET thumbnail = 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = 'diseno-grafico-completo';

UPDATE public.courses SET thumbnail = 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = '100-libros-ciberseguridad';

UPDATE public.courses SET thumbnail = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = 'pack-completo-disenadores';

UPDATE public.courses SET thumbnail = 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = '620-libros-emprendimiento';

UPDATE public.courses SET thumbnail = 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
WHERE slug = 'diseno-interfaces-ux-ui';

-- UNSPLASH (resto del catálogo)
UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'ingles-b1-b2-2-meses';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'domina-ia-ingresos';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'mejora-memoria-5-dias';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'manual-formulas-excel';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'curso-copywriting-ventas';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'especialista-excel-ejercicios';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1684469796853-3334c44243b7?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'curso-practico-chatgpt';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'modelado-3d-blender';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop'
WHERE slug = '400-libros-ciberseguridad';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'pack-programador-avanzado';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'curso-programacion-c';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop'
WHERE slug = '600-libros-marketing-finanzas';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop'
WHERE slug = '60-plantillas-excel-contables';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'curso-finanzas-personales';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'biblioteca-universitaria-20gb';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'preparacion-ielts-completa';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1532619675609-0c09df582b8d?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'tesis-con-chatgpt';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'curso-logistica-libros';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1531651008558-ed1740375b39?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'biblioteca-ciencias-ocultas';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'nutricion-ganancia-muscular';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'economia-digital-trading';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'ingles-100-dias';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'trafico-organico-redes';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'paquete-oficios-manuales';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'python-0-a-experto';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'aprende-java-ejercicios';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop'
WHERE slug = '2500-libros-programacion';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop'
WHERE slug = '200-libros-psicologia';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'pack-office-completo';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'bases-datos-sql-chatgpt';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'gramatica-inglesa-completa';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'pack-2000-audiolibros';

UPDATE public.courses SET thumbnail = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop'
WHERE slug = 'ingles-pimsleur-completo';

COMMIT;
