import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mkmbhxqwmzyrrshexpqd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYm1ieHF3bXp5cnJzaGV4cHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MTAwMjIsImV4cCI6MjA2OTk4NjAyMn0.Fj-J7m3UeY9p-B10pQ5YhKq7N7yM1y8xM7wK5z2K5u4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
