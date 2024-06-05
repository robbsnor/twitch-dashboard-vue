import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import { TwitchService } from '../../shared/services/twitch.service';


export const useAuthStore = defineStore('auth',
    () => {
        const user = ref<TwitchUser | null>();
        const accessToken = ref<string | null>();
        let twitchService: TwitchService;

        const signIn = async () => {
            accessToken.value = window.location.hash.substring(1).split('&').map(hash => hash.split('='))[0][1];

            twitchService = new TwitchService(accessToken.value);
            const { userId } = await TwitchService.validateToken(accessToken.value);

            const res = await twitchService.getUsers({ ids: [userId] });
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
