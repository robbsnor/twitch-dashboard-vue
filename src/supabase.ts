import { createClient } from '@supabase/supabase-js';
import { useAuthStore } from './stores/auth.store';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.auth.getSession().then(({ data }) => {
    const authStore = useAuthStore();
    authStore.setSession(data.session ?? undefined);
});

supabase.auth.onAuthStateChange((_, session) => {
    const authStore = useAuthStore();
    authStore.setSession(session ?? undefined);
});
