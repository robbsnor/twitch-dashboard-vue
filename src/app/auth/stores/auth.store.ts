import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { supabase } from '@/app/supabase';
import type { Session } from '@supabase/supabase-js';
import { useLocalStorage, useStorage } from '@vueuse/core';

interface TwitchUserMetadata {
    avatar_url: string;
    custom_claims: {
        broadcaster_type: string;
        description: string;
        offline_image_url: string;
        type: string;
        view_count: number;
    };
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
    const twitchUser = useLocalStorage<TwitchUserMetadata | null>('twitch_user', null);
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
        session.value = null;
        twitchUser.value = null;
    };

    const mirrorSession = async () => {
        const { data, error } = await supabase.auth.getSession();
        session.value = data.session;
        twitchUser.value = data.session?.user.user_metadata as TwitchUserMetadata;

        if (!data.session) return;
        if (data.session.provider_refresh_token && data.session.provider_token) {
            twitchAccessToken.value = data.session.provider_token;
            twitchRefreshToken.value = data.session.provider_refresh_token;
        }

        supabase.auth.onAuthStateChange((_event, newSession) => {
            session.value = newSession;
        });
    };

    return {
        twitchUser,
        twitchAccessToken,
        twitchRefreshToken,
        session,

        signIn,
        signOut,
        mirrorSession,
    };
});
