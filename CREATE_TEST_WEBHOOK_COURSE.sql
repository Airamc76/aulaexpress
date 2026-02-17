BEGIN;

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
) VALUES (
  'Curso Test Webhook',
  'curso-test-webhook',
  'Curso de prueba para validar el flujo de pagos y recepción de webhooks.',
  100,
  100,
  'Negocios',
  'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1000&auto=format&fit=crop',
  5.0,
  0,
  'Acceso Vitalicio',
  'Básico',
  'https://drive.google.com/',
  '[{"id":"m1","title":"Prueba","lessons":["Generar pago","Recibir webhook","Validar estado"]}]',
  ARRAY['Ninguno'],
  ARRAY['Test QA', 'Desarrolladores'],
  ARRAY['Validación de integraciones', 'Pruebas de pago']
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

COMMIT;
