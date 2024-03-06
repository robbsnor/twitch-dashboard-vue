import { createClient, type Session } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const session = ref<Session>();

    supabase.auth.onAuthStateChange((event, session) => {
        setSession(session ?? undefined);
    });

    const setSession = (_session?: Session) => {
        session.value = _session;
    };

    const signInWithTwitch = async () => {
        try {
            return await supabase.auth.signInWithOAuth({
                provider: 'twitch',
            });
        } catch (error) {
            console.log(error);
        }
    };

    const signOut = async () => {
        return await supabase.auth.signOut();
    };

    return {
        session,
        setSession,
        signInWithTwitch,
        signOut,
    };
});
