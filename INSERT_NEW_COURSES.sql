-- ===============================================================
-- INSERTAR NUEVOS CURSOS CON CATEGORÍAS Y PORTADAS AUTOMÁTICAS
-- ===============================================================

INSERT INTO public.courses (
  title, 
  slug, 
  description, 
  price, 
  old_price, 
  category, 
  thumbnail, 
  rating, 
  students, 
  duration, 
  level, 
  drive_link,
  modules,
  requirements,
  target_audience,
  benefits
) VALUES 
-- 1. Marketing
(
  'Facebook Ads Desde 0: Domina la Publicidad', 
  'facebook-ads-desde-0', 
  'Aprende a crear campañas rentables en Facebook e Instagram Ads desde cero. Incluye estrategias de segmentación y escalado.', 
  14.99, 59.99, 'Marketing', 
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop', 
  4.8, 1540, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1fDM862diYAnBnAXPcn2WOexIVZTHwA-S?usp=sharing',
  '[{"id":"m1","title":"Fundamentos","lessons":["Configuración del Business Manager","Estructura de Campañas"]},{"id":"m2","title":"Estrategia","lessons":["Segmentación Avanzada","Remarketing"]}]',
  ARRAY['Cuenta de Facebook'], ARRAY['Emprendedores', 'Marketers'], ARRAY['Campañas rentables', 'Certificación']
),

-- 2. Idiomas (Desarrollo Personal)
(
  'Inglés Intensivo: B1 y B2 en 2 Meses', 
  'ingles-b1-b2-2-meses', 
  'Método acelerado para obtener tus certificados de inglés. Material enfocado en gramática, vocabulario y práctica de examen.', 
  19.99, 89.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop', 
  4.9, 2300, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1-01_4gn3aLDX-1IYxcVi3bJ5NuMFTpWM',
  '[{"id":"m1","title":"Nivel B1","lessons":["Gramática Esencial","Listening Practice"]},{"id":"m2","title":"Nivel B2","lessons":["Advanced Writing","Speaking Tips"]}]',
  ARRAY['Ganas de aprender'], ARRAY['Estudiantes', 'Profesionales'], ARRAY['Certificación rápida', 'Fluidez']
),

-- 3. Diseño (Video)
(
  'Tutorial Completo de CapCut: Edición Viral', 
  'tutorial-capcut-completo', 
  'Aprende a editar videos para TikTok y Reels como un profesional usando CapCut. Efectos, transiciones y trucos de retención.', 
  9.99, 39.99, 'Diseño', 
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?q=80&w=1000&auto=format&fit=crop', 
  4.7, 980, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1B8fUeKAjYUKLe6gEwOQtR9ODOtpWhKv-',
  '[{"id":"m1","title":"Edición Básica","lessons":["Interfaz","Cortes y Ritmo"]},{"id":"m2","title":"Efectos Virales","lessons":["Transiciones","Subtítulos Dinámicos"]}]',
  ARRAY['Smartphone'], ARRAY['Creadores de contenido'], ARRAY['Videos virales', 'Edición rápida']
),

-- 4. Negocios (IA)
(
  'Domina la IA para Generar Ingresos', 
  'domina-ia-ingresos', 
  'Descubre cómo monetizar herramientas de Inteligencia Artificial. Modelos de negocio actuales y automatización.', 
  14.99, 69.99, 'Negocios', 
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop', 
  4.8, 1200, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1pai_BIZgHRySZxfQnR2x02djCUfjAE14?usp=sharing',
  '[{"id":"m1","title":"Fundamentos de Monetización","lessons":["Servicios con IA","Productos Digitales"]},{"id":"m2","title":"Herramientas","lessons":["Midjourney","ChatGPT para Ventas"]}]',
  ARRAY['PC con internet'], ARRAY['Emprendedores digitales'], ARRAY['Nuevas fuentes de ingreso', 'Automatización']
),

-- 5. Desarrollo Personal (Memoria)
(
  'Super Memoria en 5 Días', 
  'mejora-memoria-5-dias', 
  'Técnicas avanzadas de mnemotecnia para potenciar tu cerebro. Recuerda nombres, listas y datos complejos fácilmente.', 
  12.99, 49.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format&fit=crop', 
  4.6, 850, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1vNLfOgxZMeDMNRgKeTSNZc40SnRlxJtG',
  '[{"id":"m1","title":"Técnicas Base","lessons":["Palacio de la Memoria","Asociación"]},{"id":"m2","title":"Aplicación","lessons":["Recordar Nombres","Estudio Eficiente"]}]',
  ARRAY['Ninguno'], ARRAY['Estudiantes', 'Profesionales'], ARRAY['Aprendizaje acelerado', 'Mejor concentración']
),

-- 6. Negocios (Excel)
(
  'Manual PDF: Fórmulas y Funciones Excel', 
  'manual-formulas-excel', 
  'La guía definitiva de referencias para Excel. Ten a mano todas las fórmulas esenciales explicadas con ejemplos.', 
  7.99, 29.99, 'Negocios', 
  'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1000&auto=format&fit=crop', 
  4.8, 3000, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/file/d/1YR4btoUBW-RFpUIpDAtwx0MAZNnTfOak/view',
  '[{"id":"m1","title":"Recursos","lessons":["Manual Completo PDF"]}]',
  ARRAY['Lector PDF'], ARRAY['Administrativos', 'Contables'], ARRAY['Referencia rápida', 'Productividad']
),

-- 7. Marketing (Copywriting)
(
  'Curso de Copywriting: Escribe para Vender', 
  'curso-copywriting-ventas', 
  'Aprende el arte de la escritura persuasiva. Crea textos que conviertan lectores en clientes.', 
  14.99, 59.99, 'Marketing', 
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop', 
  4.9, 1100, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/folders/1pzvDHFNCFzin9hvVUJPX841jTPiiS4uG',
  '[{"id":"m1","title":"Psicología de Ventas","lessons":["Sesgos Cognitivos","Estructuras de Copy"]},{"id":"m2","title":"Formatos","lessons":["Email Marketing","Landing Pages"]}]',
  ARRAY['Computadora'], ARRAY['Marketers', 'Redactores'], ARRAY['Más ventas', 'Mejores textos']
),

-- 8. Programación (Ciberseguridad)
(
  'Biblioteca: 100 Libros de Ciberseguridad', 
  '100-libros-ciberseguridad', 
  'Colección masiva de literatura sobre seguridad informática, hacking ético y redes.', 
  19.99, 99.99, 'Programación', 
  'https://images.unsplash.com/photo-1563206767-5b1d972f9fb3?q=80&w=1000&auto=format&fit=crop', 
  5.0, 500, 'Acceso Vitalicio', 'Avanzado', 
  'https://drive.google.com/drive/u/0/folders/1DqvFPxC3ROZgRndVYsfpX7C7Nqx1CnmL?fbclid=IwY2xjawHuOIdleHRuA2FlbQIxMAABHaf0yjKX9scjinVG0Ayr3sMuGHLapR1GRNjm9HFU_bdUIsd8MuExCo_8qQ_aem_g4k8wHD5G8UNSjtXWNte7A',
  '[{"id":"m1","title":"Biblioteca","lessons":["Acceso a Carpeta de Libros"]}]',
  ARRAY['Ganas de leer'], ARRAY['Estudiantes de IT', 'Pentesters'], ARRAY['Conocimiento profundo', 'Recursos ilimitados']
),

-- 9. Negocios (Excel Especialista)
(
  'Especialista en Excel: Ejercicios Prácticos', 
  'especialista-excel-ejercicios', 
  'Pasa de la teoría a la práctica con ejercicios reales ya resueltos en hojas de cálculo.', 
  14.99, 49.99, 'Negocios', 
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop', 
  4.7, 2100, 'Acceso Vitalicio', 'Avanzado', 
  'https://drive.google.com/drive/mobile/folders/1ApmkgpCdnq_tScJEqZrzdU2Uym8mhxob?usp=sharing&fbclid=IwY2xjawEwxvFleHRuA2FlbQIxMQABHcmgipHBQ__jZUG-61-NIAugYFzXkfnaLmMWiIJ0uDQBuLucosu-CJBH7A_aem_qYZja7wLobP1RO0QligKVw',
  '[{"id":"m1","title":"Práctica","lessons":["Ejercicios Resueltos","Plantillas de Trabajo"]}]',
  ARRAY['Excel Instalado'], ARRAY['Analistas'], ARRAY['Dominio práctico', 'Solución de problemas reales']
),

-- 10. Negocios (ChatGPT)
(
  'Curso Práctico de ChatGPT', 
  'curso-practico-chatgpt', 
  'Aprende a usar ChatGPT para el día a día. Prompts efectivos para trabajo, estudio y creatividad.', 
  12.99, 49.99, 'Negocios', 
  'https://images.unsplash.com/photo-1684469796853-3334c44243b7?q=80&w=1000&auto=format&fit=crop', 
  4.8, 3200, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/14mErF59r5pxqrRY2KVojPOrA7dRgHJP1?sort=13&direction=a',
  '[{"id":"m1","title":"Uso Eficiente","lessons":["Ingeniería de Prompts Básica","Casos de Uso"]}]',
  ARRAY['Cuenta OpenAI'], ARRAY['Público general'], ARRAY['Productividad inmediata', 'Ahorro de tiempo']
),

-- 11. Diseño (Blender)
(
  'Modelado 3D con Blender', 
  'modelado-3d-blender', 
  'Iníciate en el mundo del 3D. Crea personajes, objetos y escenarios con software gratuito profesional.', 
  19.99, 79.99, 'Diseño', 
  'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1000&auto=format&fit=crop', 
  4.9, 600, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1aoN1IXWMYwiPv0EVT3uKNY3cHynn8tqs',
  '[{"id":"m1","title":"Interfaz y Mesh","lessons":["Navegación 3D","Modelado Básico"]},{"id":"m2","title":"Render","lessons":["Materiales","Iluminación"]}]',
  ARRAY['PC Potente', 'Blender Instalado'], ARRAY['Artistas 3D', 'Diseñadores'], ARRAY['Creación de assets', 'Renderizado']
),

-- 12. Diseño (Gráfico Completo)
(
  'Curso de Diseño Gráfico Completo', 
  'diseno-grafico-completo', 
  'Domina los fundamentos del diseño: color, tipografía, composición y herramientas principales.', 
  19.99, 89.99, 'Diseño', 
  'https://images.unsplash.com/photo-1626785774573-4b799314348d?q=80&w=1000&auto=format&fit=crop', 
  4.8, 1500, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/folders/1WzVLVcfKO199H18YuLtc0gSOAGWtw7HA?direction=a',
  '[{"id":"m1","title":"Teoría del Diseño","lessons":["Psicología del Color","Tipografía"]},{"id":"m2","title":"Herramientas","lessons":["Photoshop Básico","Illustrator Básico"]}]',
  ARRAY['Adobe Suite'], ARRAY['Creativos'], ARRAY['Portafolio profesional', 'Fundamentos sólidos']
),

-- 13. Programación (400 Libros Ciberseguridad)
(
  'Mega Pack: 400 Libros de Ciberseguridad', 
  '400-libros-ciberseguridad', 
  'La colección más grande de conocimientos en seguridad informática. Desde hacking ético hasta forense digital.', 
  24.99, 149.99, 'Programación', 
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop', 
  5.0, 300, 'Acceso Vitalicio', 'Avanzado', 
  'https://drive.google.com/drive/mobile/folders/1DqvFPxC3ROZgRndVYsfpX7C7Nqx1CnmL?fbclid=IwY2xjawHuOIdleHRuA2FlbQIxMAABHaf0yjKX9scjinVG0Ayr3sMuGHLapR1GRNjm9HFU_bdUIsd8MuExCo_8qQ_aem_g4k8wHD5G8UNSjtXWNte7A',
  '[{"id":"m1","title":"Biblioteca","lessons":["Acceso a Repositorio"]}]',
  ARRAY['Interés en Seguridad'], ARRAY['Expertos en IT'], ARRAY['Referencia técnica masiva']
),

-- 14. Programación (Pack 4 Cursos)
(
  'Pack Programador Profesional Avanzado', 
  'pack-programador-avanzado', 
  '4 Cursos en 1 para llevar tus habilidades de código al siguiente nivel. Arquitectura, patrones y más.', 
  29.99, 199.99, 'Programación', 
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop', 
  4.9, 450, 'Acceso Vitalicio', 'Avanzado', 
  'https://drive.google.com/drive/mobile/folders/119UfMSrcpw1OIld3nestpb73BxxlwPrD?fbclid=IwAR0Qt6GX0e7NRP4u7zSIQwVoeJx_-GdXGNeXK0zh9L5PsooKSrr88wpFp_g',
  '[{"id":"m1","title":"Contenido","lessons":["Curso 1: Arquitectura","Curso 2: Backend","Curso 3: Frontend","Curso 4: DevOps"]}]',
  ARRAY['Conocimientos previos'], ARRAY['Desarrolladores Senior'], ARRAY['Mejores salarios', 'Código limpio']
),

-- 15. Programación (C)
(
  'Curso de Programación en C', 
  'curso-programacion-c', 
  'Aprende el lenguaje madre de la computación moderna. Gestión de memoria, punteros y algoritmos eficientes.', 
  14.99, 49.99, 'Programación', 
  'https://images.unsplash.com/photo-1515879421865-e368c2629b97?q=80&w=1000&auto=format&fit=crop', 
  4.7, 800, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1o_njE2B908GSrGNvrQ_I89qnadm_RkIc?fbclid=IwZXh0bgNhZW0CMTEAAR0U0qh4H7UvIMZypL3TL6cpQRif54ecfRvyY4tsjI2wZNPEzdKYQvSUDz4_aem_AYHjbaBlRxxL1kyDRITOjEcscuGc3ZCdZpGLpGbwLLAyTL9op-v6F0MqjFGJb3ktekhppsGbm4DEOipy1sVAj7ds',
  '[{"id":"m1","title":"Fundamentos C","lessons":["Sintaxis","Punteros","Estructuras de Datos"]}]',
  ARRAY['PC'], ARRAY['Estudiantes CS'], ARRAY['Base sólida de programación', 'Alto rendimiento']
),

-- 16. Negocios (Biblioteca Marketing)
(
  'Biblioteca: 600 Libros de Marketing y Finanzas', 
  '600-libros-marketing-finanzas', 
  'Un arsenal de conocimiento empresarial. Ventas, estrategia, economía y libertad financiera.', 
  19.99, 120.00, 'Negocios', 
  'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop', 
  4.9, 1100, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1Ao-F8_kd6rfA-ipOvJNX9lCwovBkfG8G?fbclid=IwAR1LMMcZIKDZmkJNOE68Fg24awKqdrciWwB9JHoU0-2NVZ06OLh_94YZ7K4',
  '[{"id":"m1","title":"Colección","lessons":["Libros de Marketing","Libros de Ventas","Libros de Finanzas"]}]',
  ARRAY['Lector PDF'], ARRAY['Emprendedores'], ARRAY['Educación financiera', 'Estrategias de venta']
),

-- 17. Negocios (Plantillas Contables)
(
  '60 Plantillas Excel para Contadores', 
  '60-plantillas-excel-contables', 
  'Automatiza tu trabajo contable y administrativo. Balances, flujos de caja, nóminas y más listos para usar.', 
  14.99, 59.99, 'Negocios', 
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop', 
  4.8, 2500, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1CGRxpPpZPOJ1uqjRg6eodb-o2fX2P1o2?fbclid=IwAR06bhcQcFPtENFBtpORoVIrMuwY58lq47QQh8Dj9GkCxlYtfcBQTXFLMHE',
  '[{"id":"m1","title":"Plantillas","lessons":["Finanzas","RRHH","Administración"]}]',
  ARRAY['Excel'], ARRAY['Contadores', 'Administradores'], ARRAY['Ahorro de tiempo', 'Profesionalismo']
),

-- 18. Negocios (Finanzas Personales)
(
  'Curso Completo de Finanzas Personales', 
  'curso-finanzas-personales', 
  'Toma el control de tu dinero. Aprende a presupuestar, ahorrar e invertir inteligentemente.', 
  14.99, 59.99, 'Negocios', 
  'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop', 
  4.9, 1800, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1sukk0BuEyizwV7PVOhlmeLTuIQ3Mt8H2',
  '[{"id":"m1","title":"Básicos","lessons":["Presupuesto","Deuda"]},{"id":"m2","title":"Inversión","lessons":["Interés Compuesto","Portafolio"]}]',
  ARRAY['Ninguno'], ARRAY['Todo público'], ARRAY['Libertad financiera', 'Paz mental']
),

-- 19. Desarrollo Personal (Biblioteca Univ)
(
  'Mega Biblioteca Universitaria (20GB)', 
  'biblioteca-universitaria-20gb', 
  'Recursos académicos masivos para estudiantes. Libros, apuntes y guías de múltiples carreras.', 
  9.99, 49.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop', 
  4.7, 5000, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/13CaXUvnKyrcuN9DnQV5m_xmlhpvI4Mr5?usp=sharing&fbclid=IwAR0yYuzFtcP16JaVspjtFqyN_H_3ZIpfvfbs8cCoFe0t7iGa40iyI36AX7Y',
  '[{"id":"m1","title":"Recursos","lessons":["Acceso a Carpetas por Carrera"]}]',
  ARRAY['Drive'], ARRAY['Universitarios'], ARRAY['Material de estudio', 'Ahorro en libros']
),

-- 20. Desarrollo Personal (IELTS)
(
  'Preparación Completa IELTS', 
  'preparacion-ielts-completa', 
  'Material de estudio enfocado para aprobar el examen internacional de inglés IELTS con alta puntuación.', 
  19.99, 79.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop', 
  4.8, 900, 'Acceso Vitalicio', 'Avanzado', 
  'https://drive.google.com/drive/mobile/folders/15LQfzQOmuwprTSgOkw9JnOXTX_usAiOU?usp=sharing',
  '[{"id":"m1","title":"Examen","lessons":["Reading","Writing","Listening","Speaking"]}]',
  ARRAY['Inglés Intermedio'], ARRAY['Estudiantes internacionales'], ARRAY['Certificación Global', 'Movilidad']
),

-- 21. Diseño (Pack Diseñadores)
(
  'Pack Definitivo para Diseñadores', 
  'pack-completo-disenadores', 
  'Recursos gráficos premium gratuitos. Vectores, fuentes, mockups y pinceles para acelerar tu trabajo.', 
  14.99, 69.99, 'Diseño', 
  'https://images.unsplash.com/photo-1611532736681-460ce04a3b84?q=80&w=1000&auto=format&fit=crop', 
  4.9, 2100, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1jVWFohxjkAwJmWMzWGzWn36WGZ0voV3-',
  '[{"id":"m1","title":"Assets","lessons":["Fuentes","Mockups","Vectores"]}]',
  ARRAY['Software de Diseño'], ARRAY['Diseñadores Gráficos'], ARRAY['Ahorro de tiempo', 'Recursos premium']
),

-- 22. Negocios (Libros Emprendimiento)
(
  'Biblioteca: 620+ Libros de Emprendimiento', 
  '620-libros-emprendimiento', 
  'La biblioteca del CEO. Biografías, estrategias y manuales de los empresarios más exitosos del mundo.', 
  19.99, 99.99, 'Negocios', 
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop', 
  5.0, 1500, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/folders/1spBb8lkQibkedyH19s95IA5wLQKuSJEy?usp=drive_link',
  '[{"id":"m1","title":"Colección","lessons":["Liderazgo","Startups","Ventas"]}]',
  ARRAY['Lector PDF'], ARRAY['CEOs', 'Fundadores'], ARRAY['Mentalidad', 'Estrategia']
),

-- 23. Desarrollo Personal (Tesis ChatGPT)
(
  'Realización de Tesis con ChatGPT', 
  'tesis-con-chatgpt', 
  'Acelera tu investigación académica. Usa IA para estructurar, redactar y corregir tu tesis éticamente.', 
  14.99, 49.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1532619675609-0c09df582b8d?q=80&w=1000&auto=format&fit=crop', 
  4.7, 800, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/u/0/folders/11wSzhiZ7TTizSlxs1REAGpxkxOlovhLg?fbclid=IwZXh0bgNhZW0CMTEAAR1sIg8hb7Eic4v7NVPimD5fSvwKp6y_RsUob7_dSBqwH8mLMvXtXdWtVoM_aem_ASYJ0EJSzYOgcnPmFPo0IDj_zRpsXC09c6Ffajq3VHYsctqTQEPY5_LntS_ZKXvYtIQlbApnSh_u1jB4XCyIHA6q',
  '[{"id":"m1","title":"Metodología","lessons":["Estructura","Búsqueda Bibliográfica con IA"]}]',
  ARRAY['Proyecto de Tesis'], ARRAY['Universitarios'], ARRAY['Graduación rápida', 'Menos estrés']
),

-- 24. Negocios (Logística)
(
  'Curso Completo de Logística + Biblioteca', 
  'curso-logistica-libros', 
  'Domina la cadena de suministro. Gestión de almacenes, transporte y distribución eficiente.', 
  19.99, 79.99, 'Negocios', 
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop', 
  4.6, 600, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1n1KdzwCRrUtlyq14K9pi9wyBjfXw_poS?usp=sharing&fbclid=IwAR3JK8eVDRZaOUFIYhhOxnAAzCxFBlTtJyoyWpn8624o2_0rhLxIE1zhkK8',
  '[{"id":"m1","title":"Curso","lessons":["Supply Chain","Inventarios"]},{"id":"m2","title":"Libros","lessons":["Biblioteca Logística"]}]',
  ARRAY['Ninguno'], ARRAY['Jefes de Operaciones'], ARRAY['Eficiencia operativa', 'Reducción de costos']
),

-- 25. Desarrollo Personal (Esoterismo)
(
  'Biblioteca Oculta: Ciencias Esotéricas', 
  'biblioteca-ciencias-ocultas', 
  'Colección única sobre numerología, hermetismo y ciencias antiguas. Solo para investigadores serios.', 
  14.99, 49.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1531651008558-ed1740375b39?q=80&w=1000&auto=format&fit=crop', 
  4.5, 300, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1e9kQh_1D-CpYCVaWqQ8gfoWOzC26i7qI?sort=13&direction=a',
  '[{"id":"m1","title":"Textos","lessons":["Numerología","Simbolismo"]}]',
  ARRAY['Mente abierta'], ARRAY['Investigadores'], ARRAY['Conocimiento ancestral']
),

-- 26. Desarrollo Personal (Nutrición)
(
  'Nutrición para Ganancia Muscular', 
  'nutricion-ganancia-muscular', 
  'Aprende a comer para crecer. Dietas, macros y suplementación enfocada en hipertrofia.', 
  12.99, 49.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop', 
  4.8, 1200, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1-xARy8NTqit486qbqorfFcNClzyAe5Oz?fbclid=IwAR3RtGAdd8MdAM5zPY58kEFyr9bcDwe4zjCL0c06AAqNUgAqkITcyLydP04&usp=drive_copy',
  '[{"id":"m1","title":"Fundamentos","lessons":["Cálculo de Macros","Superávit Calórico"]},{"id":"m2","title":"Menús","lessons":["Ejemplos de Dietas"]}]',
  ARRAY['Ganas de entrenar'], ARRAY['Deportistas'], ARRAY['Cuerpo estético', 'Salud']
),

-- 27. Negocios (Economía Digital)
(
  'Economía Digital: Cripto y Trading', 
  'economia-digital-trading', 
  'Entiende el dinero moderno. Bitcoin, Blockchain y fundamentos de Trading para principiantes.', 
  19.99, 99.99, 'Negocios', 
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000&auto=format&fit=crop', 
  4.7, 1800, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1dWcTjUSePjyEriSUvbB--6J3fETPzn4D?usp=share_link',
  '[{"id":"m1","title":"Cripto","lessons":["Bitcoin","Wallets"]},{"id":"m2","title":"Trading","lessons":["Análisis Técnico Básico"]}]',
  ARRAY['Capital de riesgo'], ARRAY['Inversores'], ARRAY['Diversificación', 'Futuro financiero']
),

-- 28. Desarrollo Personal (Inglés 100 Días)
(
  'Inglés en 100 Días: Método Rápido', 
  'ingles-100-dias', 
  'Programa estructurado día a día para pasar de cero a conversacional en poco más de 3 meses.', 
  14.99, 59.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop', 
  4.7, 2500, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1mwwsZSwxmDaliG0ZzTlsCYNWpGpdfarJ',
  '[{"id":"m1","title":"Plan","lessons":["Días 1-30: Bases","Días 31-60: Verbos","Días 61-100: Fluidez"]}]',
  ARRAY['Constancia'], ARRAY['Viajeros', 'Principiantes'], ARRAY['Hablar inglés', 'Rutina de estudio']
),

-- 29. Diseño (UX/UI)
(
  'Diseño de Interfaces UX/UI', 
  'diseno-interfaces-ux-ui', 
  'Crea experiencias digitales increíbles. Aprende a diseñar webs y apps centradas en el usuario.', 
  19.99, 79.99, 'Diseño', 
  'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=1000&auto=format&fit=crop', 
  4.9, 1300, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/folders/1-yabRkZYGlsHHa4ikbR5iUqipddGq4En',
  '[{"id":"m1","title":"UX","lessons":["Investigación","User Personas"]},{"id":"m2","title":"UI","lessons":["Sistemas de Diseño","Prototipado"]}]',
  ARRAY['Figma/Adobe XD'], ARRAY['Diseñadores Web'], ARRAY['Carrera tech', 'Portafolio']
),

-- 30. Marketing (Tráfico Orgánico)
(
  'Tráfico Orgánico para Redes Sociales', 
  'trafico-organico-redes', 
  'Crece sin pagar publicidad. Estrategias de contenido viral para Instagram, TikTok y Facebook.', 
  12.99, 49.99, 'Marketing', 
  'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop', 
  4.8, 1600, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1obd4aG9Akxa5vSwezQiLY4mY3JT6ni6e',
  '[{"id":"m1","title":"Contenido","lessons":["Ganchos Virales","Retención"]},{"id":"m2","title":"Algoritmos","lessons":["Entendiendo las Redes"]}]',
  ARRAY['Smartphone'], ARRAY['Creadores', 'Marcas'], ARRAY['Seguidores reales', 'Ventas orgánicas']
),

-- 31. Desarrollo Personal (Oficios)
(
  'Paquete de Cursos de Oficios', 
  'paquete-oficios-manuales', 
  'Aprende habilidades prácticas: electricidad, plomería, carpintería y más. Ideal para salidas laborales rápidas.', 
  14.99, 59.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1000&auto=format&fit=crop', 
  4.7, 800, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1m5C0dJT4avirnS-wIIpE2gNV6FnhykJu?fbclid=IwAR1WuA7d_f3Ld81Qo_p6UMVg8S0PKA3AJmbBTubkU-CFRKcix9sZAjUT4XE',
  '[{"id":"m1","title":"Oficios","lessons":["Electricidad","Reparaciones","Carpintería"]}]',
  ARRAY['Herramientas básicas'], ARRAY['Handyman', 'Emprendedores'], ARRAY['Salida laboral', 'Ahorro en casa']
),

-- 32. Programación (Python)
(
  'Python de 0 a Experto', 
  'python-0-a-experto', 
  'El lenguaje más popular del mundo. Desde "Hola Mundo" hasta Ciencia de Datos y Automatización.', 
  19.99, 89.99, 'Programación', 
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1000&auto=format&fit=crop', 
  4.9, 3500, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/folders/1SRskNvLePlSTUVMQZSv9LQTVkkwPC03O',
  '[{"id":"m1","title":"Fundamentos","lessons":["Sintaxis","Funciones"]},{"id":"m2","title":"Avanzado","lessons":["Pandas","Scripting"]}]',
  ARRAY['PC'], ARRAY['Futuros programadores'], ARRAY['Automatización', 'Carrera en Datos']
),

-- 33. Programación (Java)
(
  'Aprende Java con Ejercicios', 
  'aprende-java-ejercicios', 
  'Domina Java, el estándar de la industria empresarial. Programación Orientada a Objetos explicada.', 
  14.99, 59.99, 'Programación', 
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop', 
  4.7, 1200, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/file/d/1CG88qlmgeC0dCuYO_7baSdiVpaL7VnYO/view',
  '[{"id":"m1","title":"Java Core","lessons":["POO","Colecciones"]}]',
  ARRAY['JDK Instalado'], ARRAY['Estudiantes CS'], ARRAY['Backend robusto', 'Empleabilidad']
),

-- 34. Programación (2500 Libros)
(
  'Biblioteca Dev: 2500 Libros de Programación', 
  '2500-libros-programacion', 
  'Recurso inagotable para desarrolladores. Todos los lenguajes, frameworks y metodologías en un solo lugar.', 
  24.99, 199.99, 'Programación', 
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop', 
  5.0, 900, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1hdSylyYGvshO7SLYz7y5ZbYEo67WKFB3?fbclid=IwAR2Rf56i7ue3bw0YBesnJO8-LdzBvl5lpuza0Pnme3TjYt7Dg1VuGweK-Qg',
  '[{"id":"m1","title":"Biblioteca","lessons":["Frontend","Backend","Data Science","DevOps"]}]',
  ARRAY['Curiosidad'], ARRAY['Developers'], ARRAY['Referencia técnica total']
),

-- 35. Desarrollo Personal (Psicología)
(
  'Biblioteca: 200 Libros de Psicología', 
  '200-libros-psicologia', 
  'Estudia la mente humana. Colección organizada por enfoques: Psicoanálisis, Cognitivo-Conductual y más.', 
  14.99, 59.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop', 
  4.8, 600, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1TUE-CSoztg46csXyQGIvfS5rXuBfk-ZM',
  '[{"id":"m1","title":"Ramas","lessons":["Clínica","Social","Educativa"]}]',
  ARRAY['Interés en Psi'], ARRAY['Estudiantes', 'Psicólogos'], ARRAY['Comprensión humana', 'Recursos académicos']
),

-- 36. Negocios (Office Completo)
(
  'Pack Office: Excel, Word y PowerPoint', 
  'pack-office-completo', 
  'Domina la ofimática de cero a avanzado. Sé productivo en la oficina con las herramientas esenciales.', 
  19.99, 79.99, 'Negocios', 
  'https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1000&auto=format&fit=crop', 
  4.8, 4000, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/15eup-30YZD-aeMVJTnhqd4VqU8atgT0L/1Wu0RPGB77pGnHVKjZduaOZOIsf_0-Ni1?fbclid=IwAR3QuTwflBtZq6FaKKtocoUcn2KRObOvZ1grJk5Fk35Hm1SflKQ51hb7iq4&sort=13&direction=a',
  '[{"id":"m1","title":"Herramientas","lessons":["Word Profesional","Excel Avanzado","Presentaciones PPT"]}]',
  ARRAY['Microsoft Office'], ARRAY['Oficinistas'], ARRAY['Productividad total', 'Mejores reportes']
),

-- 37. Programación (BD y SQL)
(
  'Bases de Datos con ChatGPT y SQL', 
  'bases-datos-sql-chatgpt', 
  'Aprende a diseñar y consultar bases de datos asistido por IA. SQL moderno y optimización.', 
  14.99, 59.99, 'Programación', 
  'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop', 
  4.7, 750, 'Acceso Vitalicio', 'Intermedio', 
  'https://drive.google.com/drive/mobile/folders/1ePA7EVH2JEZeKl8Hc8MAJX3rFoItFrFR?usp=sharing&fbclid=IwAR2qJpSu1dylqUhluOh_ODnuuzYUwNZynBQdknyFdcTv5OFoK7dRvUWq_6M',
  '[{"id":"m1","title":"SQL","lessons":["Consultas","Joins","Diseño Relacional"]},{"id":"m2","title":"IA","lessons":["Querys con ChatGPT"]}]',
  ARRAY['PC'], ARRAY['Analistas de Datos'], ARRAY['Manejo de datos', 'Inteligencia de negocios']
),

-- 38. Desarrollo Personal (Gramática)
(
  'Gramática Inglesa Completa', 
  'gramatica-inglesa-completa', 
  'Recurso definitivo para perfeccionar tu inglés escrito y hablado. Reglas, excepciones y ejemplos.', 
  9.99, 39.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop', 
  4.6, 1200, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/file/d/1puB-Wxk_w6f3J_GiceId5pCvXy0D6xMm/view?usp=drivesdk',
  '[{"id":"m1","title":"Gramática","lessons":["Tiempos Verbales","Preposiciones"]}]',
  ARRAY['Ganas de estudiar'], ARRAY['Estudiantes de inglés'], ARRAY['Escribir sin errores', 'Hablar correcto']
),

-- 39. Desarrollo Personal (Audiolibros)
(
  'Pack: 2000 Audiolibros', 
  'pack-2000-audiolibros', 
  'Aprende mientras viajas o entrenas. Una colección gigante de conocimiento en formato audio.', 
  19.99, 99.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=1000&auto=format&fit=crop', 
  4.9, 1500, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1eNIi91KWHTQur90rhSM5vevtIsgC_jsq',
  '[{"id":"m1","title":"Biblioteca","lessons":["Autoayuda","Negocios","Ficción"]}]',
  ARRAY['Celular'], ARRAY['Personas ocupadas'], ARRAY['Aprovechar tiempo muerto', 'Cultura general']
),

-- 40. Desarrollo Personal (Pimsleur)
(
  'Inglés Pimsleur: Básico a Avanzado', 
  'ingles-pimsleur-completo', 
  'El famoso método auditivo para aprender inglés de forma natural. Escucha, repite y habla.', 
  19.99, 89.99, 'Desarrollo Personal', 
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop', 
  4.8, 2000, 'Acceso Vitalicio', 'Básico', 
  'https://drive.google.com/drive/mobile/folders/1VH1Abk6-371kKpCKwOlhE8kRA-bYwwni/1G7BYdBMqCl-jkOGRUYQQG3GExdnOHE1D?fbclid=IwAR3jH1jreuvX2j2z8u5qeqvH0avMb-AtjG7dP_sF6xmkroZQarYFkBGZpbI&sort=13&direction=a',
  '[{"id":"m1","title":"Método","lessons":["Nivel 1: Básico","Nivel 2: Intermedio","Nivel 3: Avanzado"]}]',
  ARRAY['Audífonos'], ARRAY['Auditivos'], ARRAY['Pronunciación nativa', 'Fluidez oral']
)
ON CONFLICT (slug) DO UPDATE SET
  drive_link = EXCLUDED.drive_link,
  price = EXCLUDED.price,
  thumbnail = EXCLUDED.thumbnail;

