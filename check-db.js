import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('--- ORDERS ---');
    const { data: orders, error: err1 } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5);
    console.log(orders || err1);

    console.log('--- EMAIL LOGS ---');
    const { data: logs, error: err2 } = await supabase.from('email_logs').select('*').order('created_at', { ascending: false }).limit(5);
    console.log(logs || err2);

    console.log('--- USERS (Public data if any, or skip as we are anon) ---');
}
check();
