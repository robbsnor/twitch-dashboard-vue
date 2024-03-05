import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Session } from '@supabase/supabase-js';

export const useAuthStore = defineStore('auth', () => {
    const session = ref<Session>();

    const setSession = (_session?: Session) => {
        session.value = _session;
    };

    return { session, setSession };
});
