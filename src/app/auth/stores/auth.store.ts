import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { supabase } from '@/app/supabase';
import type { Session } from '@supabase/supabase-js';

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

export const useAuthStore = defineStore(
    'auth',
    () => {
        const user = ref<TwitchMetadata>();
        const session = ref<Session>();
        const refreshToken = ref<string>();
        const accessToken = ref<string>();

        const signIn = async () => {
            await supabase.auth.signInWithOAuth({
                provider: 'twitch',
                options: {
                    // redirectTo: `${window.location.origin}/auth/sign-in`,
                    redirectTo: `https://twitch.malmaarmals.nl/auth/sign-in`,
                    scopes: 'user:read:follows user:read:subscriptions moderator:read:followers',
                },
            });
        };

        const signOut = async () => {
            await supabase.auth.signOut();

            session.value = undefined;
            user.value = undefined;

            refreshToken.value = undefined;
            accessToken.value = undefined;
        };

        function setSession(ses: Session) {
            session.value = ses;
            user.value = ses.user.user_metadata as TwitchMetadata;

            refreshToken.value = ses.refresh_token;
            accessToken.value = ses.provider_token || undefined;
        }

        return {
            user,
            accessToken,
            refreshToken,
            session,

            signIn,
            signOut,
            setSession,
        };
    },
    {
        persist: true,
    }
);
