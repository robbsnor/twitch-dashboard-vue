import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { supabase } from '@/app/supabase';
import type { Session } from '@supabase/supabase-js';
import { useLocalStorage, useStorage } from '@vueuse/core';

export interface TwitchMetadata {
    avatar_url: string;
    custom_claims: any;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string;
    name: string;
    nickname: string;
    phone_verified: boolean;
    picture: string;
    provider_id: string;
    slug: string;
    sub: string;
}

export const useAuthStore = defineStore('auth', () => {
    const user = computed(() => session.value?.user?.user_metadata);
    const session = useLocalStorage<Session | null>('session', null);
    const twitchAccessToken = useStorage<String | null>('twitch_access_token', null);
    const twitchRefreshToken = useStorage<String | null>('twitch_refresh_token', null);

    const signIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'twitch',
            options: {
                redirectTo: `${window.location.origin}/auth/sign-in`,
                scopes: 'user:read:follows user:read:subscriptions moderator:read:followers',
            },
        });
    };

    const signOut = async () => {
        await supabase.auth.signOut();

        twitchRefreshToken.value = null;
        twitchAccessToken.value = null;
    };

    const mirrorSession = async () => {
        console.log('mirroring session');
        const { data, error } = await supabase.auth.getSession();
        session.value = data.session;

        if (!data.session) return;
        if (data.session.provider_refresh_token && data.session.provider_token) {
            twitchAccessToken.value = data.session.provider_token;
            twitchRefreshToken.value = data.session.provider_refresh_token;
        }

        supabase.auth.onAuthStateChange((_event, newSession) => {
            session.value = newSession;
            console.log('onauthchange');
            console.log(newSession);
        });
    };

    return {
        user,
        twitchAccessToken,
        twitchRefreshToken,
        session,

        signIn,
        signOut,
        mirrorSession,
    };
});
