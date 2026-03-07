BEGIN; UPDATE public.courses SET price = 5499 WHERE slug != 'curso-test-webhook'; UPDATE public.courses SET price = 100 WHERE slug = 'curso-test-webhook'; COMMIT;
