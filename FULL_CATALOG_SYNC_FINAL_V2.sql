-- ===============================================================
-- SINCRONIZACIÓN FINAL DEL CATÁLOGO (V2)
-- ===============================================================
-- Este script:
-- 1. Inserta TODOS los 41 cursos (incluyendo el olvidado "Carpetas llenas").
-- 2. Fija el precio en $5000 para todos.
-- 3. Usa imágenes estables y verificadas para evitar errores de carga.
-- 4. Corrige el nivel a 'Básico' para cumplir con las restricciones de la base de datos.

INSERT INTO public.courses (
  title, slug, description, price, old_price, category, thumbnail, 
  rating, students, duration, level, drive_link, 
  modules, requirements, target_audience, benefits
) VALUES 

-- 1. Marketing
(
  'Facebook Ads Desde 0: Domina la Publicidad', 'facebook-ads-desde-0', 
  'Aprende a crear campañas rentables en Facebook e Instagram Ads.', 
  5000, 15000, 'Marketing', 
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop', 
  4.8, 1540, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1fDM862diYAnBnAXPcn2WOexIVZTHwA-S?usp=sharing',
  '[{"id":"m1","title":"Fundamentos","lessons":["Configuración"]},{"id":"m2","title":"Estrategia","lessons":["Segmentación"]}]',
  ARRAY['Facebook'], ARRAY['Emprendedores'], ARRAY['Campañas rentables']
),

-- 2. Idiomas
(
  'Inglés Intensivo: B1 y B2 en 2 Meses', 'ingles-b1-b2-2-meses', 
  'Método acelerado para obtener tus certificados de inglés.', 
  5000, 15000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop', 
  4.9, 2300, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1-01_4gn3aLDX-1IYxcVi3bJ5NuMFTpWM',
  '[{"id":"m1","title":"Nivel B1","lessons":["Gramática"]},{"id":"m2","title":"Nivel B2","lessons":["Speaking"]}]',
  ARRAY['Ganas de aprender'], ARRAY['Estudiantes'], ARRAY['Certificación']
),

-- 3. Diseño (CapCut)
(
  'Tutorial Completo de CapCut: Edición Viral', 'tutorial-capcut-completo', 
  'Aprende a editar videos virales para TikTok y Reels.', 
  5000, 15000, 'Diseño', 
  'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop', 
  4.7, 980, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1B8fUeKAjYUKLe6gEwOQtR9ODOtpWhKv-',
  '[{"id":"m1","title":"Edición","lessons":["Cortes"]},{"id":"m2","title":"Efectos","lessons":["Transiciones"]}]',
  ARRAY['Celular'], ARRAY['Creadores'], ARRAY['Videos virales']
),

-- 4. Negocios (IA)
(
  'Domina la IA para Generar Ingresos', 'domina-ia-ingresos', 
  'Monetiza herramientas de Inteligencia Artificial.', 
  5000, 15000, 'Negocios', 
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop', 
  4.8, 1200, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1pai_BIZgHRySZxfQnR2x02djCUfjAE14?usp=sharing',
  '[{"id":"m1","title":"Monetización","lessons":["Servicios"]},{"id":"m2","title":"Herramientas","lessons":["ChatGPT"]}]',
  ARRAY['PC'], ARRAY['Emprendedores'], ARRAY['Ingresos extra']
),

-- 5. Desarrollo Personal (Memoria)
(
  'Super Memoria en 5 Días', 'mejora-memoria-5-dias', 
  'Técnicas avanzadas de mnemotecnia.', 
  5000, 15000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop', 
  4.6, 850, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1vNLfOgxZMeDMNRgKeTSNZc40SnRlxJtG',
  '[{"id":"m1","title":"Técnicas","lessons":["Palacio Memoria"]}]',
  ARRAY['Ninguno'], ARRAY['Estudiantes'], ARRAY['Memoria rápida']
),

-- 6. Negocios (Excel Manual)
(
  'Manual PDF: Fórmulas y Funciones Excel', 'manual-formulas-excel', 
  'Guía definitiva de referencias para Excel.', 
  5000, 10000, 'Negocios', 
  'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1000&auto=format&fit=crop', 
  4.8, 3000, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/file/d/1YR4btoUBW-RFpUIpDAtwx0MAZNnTfOak/view',
  '[{"id":"m1","title":"Manual","lessons":["PDF Completo"]}]',
  ARRAY['Lector PDF'], ARRAY['Administrativos'], ARRAY['Referencia']
),

-- 7. Marketing (Copywriting)
(
  'Curso de Copywriting: Escribe para Vender', 'curso-copywriting-ventas', 
  'Aprende el arte de la escritura persuasiva.', 
  5000, 15000, 'Marketing', 
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop', 
  4.9, 1100, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/folders/1pzvDHFNCFzin9hvVUJPX841jTPiiS4uG',
  '[{"id":"m1","title":"Persuasión","lessons":["Sesgos"]},{"id":"m2","title":"Formatos","lessons":["Email"]}]',
  ARRAY['PC'], ARRAY['Redactores'], ARRAY['Ventas']
),

-- 8. Programación (100 Libros Ciber)
(
  'Biblioteca: 100 Libros de Ciberseguridad', '100-libros-ciberseguridad', 
  'Colección masiva de seguridad informática.', 
  5000, 20000, 'Programación', 
  'https://images.unsplash.com/photo-1614064641938-3bcee529cfc4?q=80&w=1000&auto=format&fit=crop', 
  5.0, 500, 'Acceso Vitalicio', 'Avanzado', 
  'https://drive.google.com/drive/u/0/folders/1DqvFPxC3ROZgRndVYsfpX7C7Nqx1CnmL?fbclid=IwY2xjawHuOIdleHRuA2FlbQIxMAABHaf0yjKX9scjinVG0Ayr3sMuGHLapR1GRNjm9HFU_bdUIsd8MuExCo_8qQ_aem_g4k8wHD5G8UNSjtXWNte7A',
  '[{"id":"m1","title":"Biblioteca","lessons":["Libros"]}]',
  ARRAY['Interés'], ARRAY['Hackers'], ARRAY['Conocimiento']
),

-- 9. Negocios (Excel Esp)
(
  'Especialista en Excel: Ejercicios Prácticos', 'especialista-excel-ejercicios', 
  'Pasa de la teoría a la práctica con ejercicios reales.', 
  5000, 15000, 'Negocios', 
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop', 
  4.7, 2100, 'Acceso Vitalicio', 'Avanzado', 
  'https://drive.google.com/drive/mobile/folders/1ApmkgpCdnq_tScJEqZrzdU2Uym8mhxob?usp=sharing&fbclid=IwY2xjawEwxvFleHRuA2FlbQIxMQABHcmgipHBQ__jZUG-61-NIAugYFzXkfnaLmMWiIJ0uDQBuLucosu-CJBH7A_aem_qYZja7wLobP1RO0QligKVw',
  '[{"id":"m1","title":"Práctica","lessons":["Ejercicios"]}]',
  ARRAY['Excel'], ARRAY['Analistas'], ARRAY['Dominio']
),

-- 10. Negocios (ChatGPT) - FOTO ARREGLADA
(
  'Curso Práctico de ChatGPT', 'curso-practico-chatgpt', 
  'Prompts efectivos para trabajo y estudio.', 
  5000, 15000, 'Negocios', 
  'https://images.unsplash.com/photo-1675557009875-436f582763f0?q=80&w=1000&auto=format&fit=crop', 
  4.8, 3200, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/14mErF59r5pxqrRY2KVojPOrA7dRgHJP1?sort=13&direction=a',
  '[{"id":"m1","title":"Uso","lessons":["Prompts"]}]',
  ARRAY['OpenAI'], ARRAY['Todos'], ARRAY['Productividad']
),

-- 11. Diseño (Blender)
(
  'Modelado 3D con Blender', 'modelado-3d-blender', 
  'Crea personajes y escenarios 3D.', 
  5000, 20000, 'Diseño', 
  'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1000&auto=format&fit=crop', 
  4.9, 600, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1aoN1IXWMYwiPv0EVT3uKNY3cHynn8tqs',
  '[{"id":"m1","title":"3D","lessons":["Modelado"]}]',
  ARRAY['PC'], ARRAY['Artistas'], ARRAY['3D']
),

-- 12. Diseño (Gráfico Completo) - FOTO ARREGLADA
(
  'Curso de Diseño Gráfico Completo', 'diseno-grafico-completo', 
  'Domina color, tipografía y herramientas.', 
  5000, 20000, 'Diseño', 
  'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1000&auto=format&fit=crop', 
  4.8, 1500, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/folders/1WzVLVcfKO199H18YuLtc0gSOAGWtw7HA?direction=a',
  '[{"id":"m1","title":"Teoría","lessons":["Color"]}]',
  ARRAY['Adobe'], ARRAY['Creativos'], ARRAY['Diseño']
),

-- 13. Programación (400 Libros)
(
  'Mega Pack: 400 Libros de Ciberseguridad', '400-libros-ciberseguridad', 
  'Colección masiva de seguridad informática.', 
  5000, 25000, 'Programación', 
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop', 
  5.0, 300, 'Acceso Vitalicio', 'Avanzado', 
  'https://drive.google.com/drive/mobile/folders/1DqvFPxC3ROZgRndVYsfpX7C7Nqx1CnmL?fbclid=IwY2xjawHuOIdleHRuA2FlbQIxMAABHaf0yjKX9scjinVG0Ayr3sMuGHLapR1GRNjm9HFU_bdUIsd8MuExCo_8qQ_aem_g4k8wHD5G8UNSjtXWNte7A',
  '[{"id":"m1","title":"Libros","lessons":["Biblioteca"]}]',
  ARRAY['Interés'], ARRAY['Hackers'], ARRAY['Seguridad']
),

-- 14. Programación (Pack)
(
  'Pack Programador Profesional Avanzado', 'pack-programador-avanzado', 
  '4 Cursos en 1: Arquitectura, Backend, Frontend.', 
  5000, 30000, 'Programación', 
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop', 
  4.9, 450, 'Acceso Vitalicio', 'Avanzado', 
  'https://drive.google.com/drive/mobile/folders/119UfMSrcpw1OIld3nestpb73BxxlwPrD?fbclid=IwAR0Qt6GX0e7NRP4u7zSIQwVoeJx_-GdXGNeXK0zh9L5PsooKSrr88wpFp_g',
  '[{"id":"m1","title":"Pack","lessons":["4 Cursos"]}]',
  ARRAY['Base'], ARRAY['Devs'], ARRAY['Fullstack']
),

-- 15. Programación (C)
(
  'Curso de Programación en C', 'curso-programacion-c', 
  'Aprende el lenguaje madre de la computación.', 
  5000, 15000, 'Programación', 
  'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1000&auto=format&fit=crop', 
  4.7, 800, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1o_njE2B908GSrGNvrQ_I89qnadm_RkIc?fbclid=IwZXh0bgNhZW0CMTEAAR0U0qh4H7UvIMZypL3TL6cpQRif54ecfRvyY4tsjI2wZNPEzdKYQvSUDz4_aem_AYHjbaBlRxxL1kyDRITOjEcscuGc3ZCdZpGLpGbwLLAyTL9op-v6F0MqjFGJb3ktekhppsGbm4DEOipy1sVAj7ds',
  '[{"id":"m1","title":"C","lessons":["Punteros"]}]',
  ARRAY['PC'], ARRAY['Estudiantes'], ARRAY['Bases']
),

-- 16. Negocios (600 Libros)
(
  'Biblioteca: 600 Libros de Marketing y Finanzas', '600-libros-marketing-finanzas', 
  'Arsenal de conocimiento empresarial.', 
  5000, 20000, 'Negocios', 
  'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop', 
  4.9, 1100, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1Ao-F8_kd6rfA-ipOvJNX9lCwovBkfG8G?fbclid=IwAR1LMMcZIKDZmkJNOE68Fg24awKqdrciWwB9JHoU0-2NVZ06OLh_94YZ7K4',
  '[{"id":"m1","title":"Libros","lessons":["Marketing"]}]',
  ARRAY['Lector'], ARRAY['Emprendedores'], ARRAY['Negocios']
),

-- 17. Negocios (Plantillas)
(
  '60 Plantillas Excel para Contadores', '60-plantillas-excel-contables', 
  'Automatiza tu trabajo contable.', 
  5000, 15000, 'Negocios', 
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop', 
  4.8, 2500, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1CGRxpPpZPOJ1uqjRg6eodb-o2fX2P1o2?fbclid=IwAR06bhcQcFPtENFBtpORoVIrMuwY58lq47QQh8Dj9GkCxlYtfcBQTXFLMHE',
  '[{"id":"m1","title":"Plantillas","lessons":["Contables"]}]',
  ARRAY['Excel'], ARRAY['Contadores'], ARRAY['Tiempo']
),

-- 18. Negocios (Finanzas)
(
  'Curso Completo de Finanzas Personales', 'curso-finanzas-personales', 
  'Toma el control de tu dinero.', 
  5000, 15000, 'Negocios', 
  'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop', 
  4.9, 1800, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1sukk0BuEyizwV7PVOhlmeLTuIQ3Mt8H2',
  '[{"id":"m1","title":"Finanzas","lessons":["Ahorro"]}]',
  ARRAY['Ninguno'], ARRAY['Todos'], ARRAY['Libertad']
),

-- 19. Desarrollo Personal (Univ)
(
  'Mega Biblioteca Universitaria (20GB)', 'biblioteca-universitaria-20gb', 
  'Recursos académicos masivos.', 
  5000, 10000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop', 
  4.7, 5000, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/13CaXUvnKyrcuN9DnQV5m_xmlhpvI4Mr5?usp=sharing&fbclid=IwAR0yYuzFtcP16JaVspjtFqyN_H_3ZIpfvfbs8cCoFe0t7iGa40iyI36AX7Y',
  '[{"id":"m1","title":"Material","lessons":["Carreras"]}]',
  ARRAY['Drive'], ARRAY['Universitarios'], ARRAY['Estudio']
),

-- 20. Desarrollo Personal (IELTS)
(
  'Preparación Completa IELTS', 'preparacion-ielts-completa', 
  'Aprueba el examen IELTS.', 
  5000, 20000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop', 
  4.8, 900, 'Acceso Vitalicio', 'Avanzado', 
  'https://drive.google.com/drive/mobile/folders/15LQfzQOmuwprTSgOkw9JnOXTX_usAiOU?usp=sharing',
  '[{"id":"m1","title":"Examen","lessons":["English"]}]',
  ARRAY['Inglés'], ARRAY['Estudiantes'], ARRAY['Certificado']
),

-- 21. Diseño (Pack) - FOTO ARREGLADA
(
  'Pack Definitivo para Diseñadores', 'pack-completo-disenadores', 
  'Recursos gráficos premium.', 
  5000, 15000, 'Diseño', 
  'https://images.unsplash.com/photo-1603380353725-f8a4d39cc80e?q=80&w=1000&auto=format&fit=crop', 
  4.9, 2100, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1jVWFohxjkAwJmWMzWGzWn36WGZ0voV3-',
  '[{"id":"m1","title":"Recursos","lessons":["Vectores"]}]',
  ARRAY['Adobe'], ARRAY['Diseñadores'], ARRAY['Assets']
),

-- 22. Negocios (620 Libros)
(
  'Biblioteca: 620+ Libros de Emprendimiento', '620-libros-emprendimiento', 
  'La biblioteca del CEO.', 
  5000, 20000, 'Negocios', 
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop', 
  5.0, 1500, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/folders/1spBb8lkQibkedyH19s95IA5wLQKuSJEy?usp=drive_link',
  '[{"id":"m1","title":"Libros","lessons":["Negocios"]}]',
  ARRAY['Lector'], ARRAY['CEOs'], ARRAY['Estrategia']
),

-- 23. Desarrollo Personal (Tesis) - FOTO ARREGLADA
(
  'Realización de Tesis con ChatGPT', 'tesis-con-chatgpt', 
  'Acelera tu investigación académica con IA.', 
  5000, 15000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop', 
  4.7, 800, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/u/0/folders/11wSzhiZ7TTizSlxs1REAGpxkxOlovhLg?fbclid=IwZXh0bgNhZW0CMTEAAR1sIg8hb7Eic4v7NVPimD5fSvwKp6y_RsUob7_dSBqwH8mLMvXtXdWtVoM_aem_ASYJ0EJSzYOgcnPmFPo0IDj_zRpsXC09c6Ffajq3VHYsctqTQEPY5_LntS_ZKXvYtIQlbApnSh_u1jB4XCyIHA6q',
  '[{"id":"m1","title":"Tesis","lessons":["Redacción"]}]',
  ARRAY['Tesis'], ARRAY['Universitarios'], ARRAY['Graduación']
),

-- 24. Negocios (Logística)
(
  'Curso Completo de Logística + Biblioteca', 'curso-logistica-libros', 
  'Domina la cadena de suministro.', 
  5000, 20000, 'Negocios', 
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop', 
  4.6, 600, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1n1KdzwCRrUtlyq14K9pi9wyBjfXw_poS?usp=sharing&fbclid=IwAR3JK8eVDRZaOUFIYhhOxnAAzCxFBlTtJyoyWpn8624o2_0rhLxIE1zhkK8',
  '[{"id":"m1","title":"Logística","lessons":["Supply Chain"]}]',
  ARRAY['Ninguno'], ARRAY['Operaciones'], ARRAY['Eficiencia']
),

-- 25. Desarrollo Personal (Esoterismo)
(
  'Biblioteca Oculta: Ciencias Esotéricas', 'biblioteca-ciencias-ocultas', 
  'Colección única sobre ciencias antiguas.', 
  5000, 15000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1531651008558-ed1740375b39?q=80&w=1000&auto=format&fit=crop', 
  4.5, 300, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1e9kQh_1D-CpYCVaWqQ8gfoWOzC26i7qI?sort=13&direction=a',
  '[{"id":"m1","title":"Libros","lessons":["Ocultismo"]}]',
  ARRAY['Mente'], ARRAY['Investigadores'], ARRAY['Misterio']
),

-- 26. Desarrollo Personal (Nutrición)
(
  'Nutrición para Ganancia Muscular', 'nutricion-ganancia-muscular', 
  'Aprende a comer para crecer.', 
  5000, 15000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop', 
  4.8, 1200, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1-xARy8NTqit486qbqorfFcNClzyAe5Oz?fbclid=IwAR3RtGAdd8MdAM5zPY58kEFyr9bcDwe4zjCL0c06AAqNUgAqkITcyLydP04&usp=drive_copy',
  '[{"id":"m1","title":"Dieta","lessons":["Macros"]}]',
  ARRAY['Gym'], ARRAY['Deportistas'], ARRAY['Salud']
),

-- 27. Negocios (Cripto)
(
  'Economía Digital: Cripto y Trading', 'economia-digital-trading', 
  'Entiende Bitcoin y el Trading.', 
  5000, 20000, 'Negocios', 
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000&auto=format&fit=crop', 
  4.7, 1800, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1dWcTjUSePjyEriSUvbB--6J3fETPzn4D?usp=share_link',
  '[{"id":"m1","title":"Cripto","lessons":["Bitcoin"]}]',
  ARRAY['Capital'], ARRAY['Inversores'], ARRAY['Dinero']
),

-- 28. Desarrollo Personal (Inglés 100)
(
  'Inglés en 100 Días: Método Rápido', 'ingles-100-dias', 
  'De cero a conversacional en 3 meses.', 
  5000, 15000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop', 
  4.7, 2500, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1mwwsZSwxmDaliG0ZzTlsCYNWpGpdfarJ',
  '[{"id":"m1","title":"Curso","lessons":["Días 1-100"]}]',
  ARRAY['Tiempo'], ARRAY['Viajeros'], ARRAY['Idiomas']
),

-- 29. Diseño (UX/UI) - FOTO ARREGLADA
(
  'Diseño de Interfaces UX/UI', 'diseno-interfaces-ux-ui', 
  'Diseña webs y apps increíbles.', 
  5000, 20000, 'Diseño', 
  'https://images.unsplash.com/photo-1509395062549-4743475f3a49?q=80&w=1000&auto=format&fit=crop', 
  4.9, 1300, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/folders/1-yabRkZYGlsHHa4ikbR5iUqipddGq4En',
  '[{"id":"m1","title":"UX","lessons":["Research"]}]',
  ARRAY['Figma'], ARRAY['Diseñadores'], ARRAY['Web']
),

-- 30. Marketing (Tráfico)
(
  'Tráfico Orgánico para Redes Sociales', 'trafico-organico-redes', 
  'Crece sin pagar publicidad.', 
  5000, 15000, 'Marketing', 
  'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop', 
  4.8, 1600, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1obd4aG9Akxa5vSwezQiLY4mY3JT6ni6e',
  '[{"id":"m1","title":"Redes","lessons":["Viralidad"]}]',
  ARRAY['Celular'], ARRAY['Creadores'], ARRAY['Seguidores']
),

-- 31. Desarrollo Personal (Oficios)
(
  'Paquete de Cursos de Oficios', 'paquete-oficios-manuales', 
  'Electricidad, plomería y carpintería.', 
  5000, 15000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1000&auto=format&fit=crop', 
  4.7, 800, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1m5C0dJT4avirnS-wIIpE2gNV6FnhykJu?fbclid=IwAR1WuA7d_f3Ld81Qo_p6UMVg8S0PKA3AJmbBTubkU-CFRKcix9sZAjUT4XE',
  '[{"id":"m1","title":"Oficios","lessons":["Manuales"]}]',
  ARRAY['Herramientas'], ARRAY['Handyman'], ARRAY['Trabajo']
),

-- 32. Programación (Python)
(
  'Python de 0 a Experto', 'python-0-a-experto', 
  'El lenguaje más popular del mundo.', 
  5000, 20000, 'Programación', 
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1000&auto=format&fit=crop', 
  4.9, 3500, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/folders/1SRskNvLePlSTUVMQZSv9LQTVkkwPC03O',
  '[{"id":"m1","title":"Python","lessons":["Código"]}]',
  ARRAY['PC'], ARRAY['Devs'], ARRAY['Data']
),

-- 33. Programación (Java)
(
  'Aprende Java con Ejercicios', 'aprende-java-ejercicios', 
  'Domina Java y la POO.', 
  5000, 15000, 'Programación', 
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop', 
  4.7, 1200, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/file/d/1CG88qlmgeC0dCuYO_7baSdiVpaL7VnYO/view',
  '[{"id":"m1","title":"Java","lessons":["POO"]}]',
  ARRAY['JDK'], ARRAY['Devs'], ARRAY['Backend']
),

-- 34. Programación (2500 Libros)
(
  'Biblioteca Dev: 2500 Libros de Programación', '2500-libros-programacion', 
  'Recurso inagotable para desarrolladores.', 
  5000, 25000, 'Programación', 
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop', 
  5.0, 900, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1hdSylyYGvshO7SLYz7y5ZbYEo67WKFB3?fbclid=IwAR2Rf56i7ue3bw0YBesnJO8-LdzBvl5lpuza0Pnme3TjYt7Dg1VuGweK-Qg',
  '[{"id":"m1","title":"Libros","lessons":["Todos los lenguajes"]}]',
  ARRAY['Interés'], ARRAY['Devs'], ARRAY['Referencia']
),

-- 35. Desarrollo Personal (Psicología)
(
  'Biblioteca: 200 Libros de Psicología', '200-libros-psicologia', 
  'Estudia la mente humana.', 
  5000, 15000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop', 
  4.8, 600, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1TUE-CSoztg46csXyQGIvfS5rXuBfk-ZM',
  '[{"id":"m1","title":"Libros","lessons":["Psicología"]}]',
  ARRAY['Interés'], ARRAY['Estudiantes'], ARRAY['Mente']
),

-- 36. Negocios (Office)
(
  'Pack Office: Excel, Word y PowerPoint', 'pack-office-completo', 
  'Domina la ofimática.', 
  5000, 20000, 'Negocios', 
  'https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1000&auto=format&fit=crop', 
  4.8, 4000, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/15eup-30YZD-aeMVJTnhqd4VqU8atgT0L/1Wu0RPGB77pGnHVKjZduaOZOIsf_0-Ni1?fbclid=IwAR3QuTwflBtZq6FaKKtocoUcn2KRObOvZ1grJk5Fk35Hm1SflKQ51hb7iq4&sort=13&direction=a',
  '[{"id":"m1","title":"Office","lessons":["Herramientas"]}]',
  ARRAY['Office'], ARRAY['Oficina'], ARRAY['Productividad']
),

-- 37. Programación (SQL)
(
  'Bases de Datos con ChatGPT y SQL', 'bases-datos-sql-chatgpt', 
  'Diseña bases de datos con IA.', 
  5000, 15000, 'Programación', 
  'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop', 
  4.7, 750, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1ePA7EVH2JEZeKl8Hc8MAJX3rFoItFrFR?usp=sharing&fbclid=IwAR2qJpSu1dylqUhluOh_ODnuuzYUwNZynBQdknyFdcTv5OFoK7dRvUWq_6M',
  '[{"id":"m1","title":"SQL","lessons":["Consultas"]}]',
  ARRAY['PC'], ARRAY['Analistas'], ARRAY['Datos']
),

-- 38. Desarrollo Personal (Gramática)
(
  'Gramática Inglesa Completa', 'gramatica-inglesa-completa', 
  'Perfecciona tu inglés escrito.', 
  5000, 10000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop', 
  4.6, 1200, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/file/d/1puB-Wxk_w6f3J_GiceId5pCvXy0D6xMm/view?usp=drivesdk',
  '[{"id":"m1","title":"Gramática","lessons":["Reglas"]}]',
  ARRAY['Ganas'], ARRAY['Estudiantes'], ARRAY['Escribir bien']
),

-- 39. Desarrollo Personal (Audiolibros) - FOTO ARREGLADA
(
  'Pack: 2000 Audiolibros', 'pack-2000-audiolibros', 
  'Aprende mientras viajas.', 
  5000, 20000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop', 
  4.9, 1500, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1eNIi91KWHTQur90rhSM5vevtIsgC_jsq',
  '[{"id":"m1","title":"Audio","lessons":["Libros"]}]',
  ARRAY['Audífonos'], ARRAY['Todos'], ARRAY['Cultura']
),

-- 40. Desarrollo Personal (Pimsleur)
(
  'Inglés Pimsleur: Básico a Avanzado', 'ingles-pimsleur-completo', 
  'Método auditivo famoso.', 
  5000, 20000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop', 
  4.8, 2000, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1VH1Abk6-371kKpCKwOlhE8kRA-bYwwni/1G7BYdBMqCl-jkOGRUYQQG3GExdnOHE1D?fbclid=IwAR3jH1jreuvX2j2z8u5qeqvH0avMb-AtjG7dP_sF6xmkroZQarYFkBGZpbI&sort=13&direction=a',
  '[{"id":"m1","title":"Método","lessons":["Audio"]}]',
  ARRAY['Audífonos'], ARRAY['Auditivos'], ARRAY['Fluidez']
),

-- 41. Desarrollo Personal (Mega Mix - NUEVO)
(
  'Mega Pack: Biblioteca General de Cursos', 'mega-pack-biblioteca-variada', 
  'Miles de recursos, libros y cursos variados en una sola colección.', 
  5000, 25000, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop', 
  5.0, 5000, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/u/0/folders/1if09a9QyNfBRlAKey7If5preZ3BswudZ',
  '[{"id":"m1","title":"Contenido","lessons":["Mix de Cursos"]}]',
  ARRAY['Curiosidad'], ARRAY['Todos'], ARRAY['Aprendizaje']
)

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  category = EXCLUDED.category,
  thumbnail = EXCLUDED.thumbnail,
  rating = EXCLUDED.rating,
  students = EXCLUDED.students,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  drive_link = EXCLUDED.drive_link,
  modules = EXCLUDED.modules,
  requirements = EXCLUDED.requirements,
  target_audience = EXCLUDED.target_audience,
  benefits = EXCLUDED.benefits;
