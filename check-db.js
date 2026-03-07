import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
const supabaseUrl = env.match(/VITE_SUPABASE_URL=(.*)/)?.[1]?.trim() || '';
const supabaseKey = env.match(/VITE_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim() || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('--- COURSES PRICES ---');
    const { data: courses, error: errC } = await supabase.from('courses').select('slug, title, price');
    if (errC) console.error('Error courses:', errC);
    else console.log(JSON.stringify(courses, null, 2));
}
check();
