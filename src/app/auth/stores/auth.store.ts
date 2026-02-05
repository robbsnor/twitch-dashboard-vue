import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
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
        const user = ref<TwitchMetadata | null>();
        const session = ref<Session | null>();
        const refreshToken = ref<string | null>();
        const accessToken = ref<string | null>();

        onMounted(() => {
            mirrorSession();
        });

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

            // refreshToken.value = null;
            // accessToken.value = null;
        };

        async function mirrorSession() {
            const { data, error } = await supabase.auth.getSession();
            session.value = data.session;

            if (!data.session) return;
            if (data.session.provider_refresh_token && data.session.provider_token) {
                accessToken.value = data.session.provider_token;
                refreshToken.value = data.session.provider_refresh_token;
            }

            supabase.auth.onAuthStateChange((_event, newSession) => {
                session.value = newSession;
            });
        }

        return {
            user,
            accessToken,
            refreshToken,
            session,

            signIn,
            signOut,
        };
    },
    {
        persist: true,
    }
);
