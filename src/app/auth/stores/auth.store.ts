import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import { TwitchApiService } from '../../shared/services/twitch-api.service';

export const useAuthStore = defineStore('auth',
    () => {
        const user = ref<TwitchUser | null>();
        const accessToken = ref<string | null>();
        let twitchApiService: TwitchApiService;

        const signIn = async () => {
            accessToken.value = window.location.hash.substring(1).split('&').map(hash => hash.split('='))[0][1];

            twitchApiService = new TwitchApiService(accessToken.value);
            const { userId } = await TwitchApiService.validateToken(accessToken.value);

            const res = await twitchApiService.getUsers({ ids: [userId] });
            user.value = res.data[0];
        };

        const signOut = async () => {
            user.value = null;
            accessToken.value = null;
        };

        return {
            user,
            accessToken,
            signIn,
            signOut,
        };
    },
    {
        persist: true,
    }
);
