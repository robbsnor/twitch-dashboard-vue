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

            session.value = null;
            user.value = null;

            refreshToken.value = null;
            accessToken.value = null;
        };

        async function mirrorSession() {
            supabase.auth.onAuthStateChange(async (event, _session) => {
                session.value = _session;
                user.value = _session?.user.user_metadata as TwitchMetadata;

                refreshToken.value = _session?.provider_refresh_token || null;
                accessToken.value = _session?.provider_token || null;
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
