import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mkmbhxqwmzyrrshexpqd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rbWJoeHF3bXp5cnJzaGV4cHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxOTA3NDMsImV4cCI6MjA5Nzc2Njc0M30.b5fEAnYfwBqO-G_kITTKcSaYLB898EWmpxSfh394Ahs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);