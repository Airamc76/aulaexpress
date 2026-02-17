
import { createClient } from '@supabase/supabase-js';

// Reemplaza estas variables con las de tu proyecto de Supabase
// Puedes encontrarlas en Project Settings -> API
const supabaseUrl = 'https://aezdsmuvudnsggpezlag.supabase.co'; // Tomado de tu captura
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlemRzbXV2dWRuc2dncGV6bGFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MTc1MzEsImV4cCI6MjA4NjQ5MzUzMX0.msa2UySG9MVogJ1alnDWhrMUI0t5bstg6Kk4yYapycU'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
