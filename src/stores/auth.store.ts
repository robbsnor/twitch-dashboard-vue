import { TwitchService } from './../services/twitch.service';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { LocalStorageService } from '../services/localstorage.service';

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref<string | null>(null);
    const user = ref<any>();

    const twitchService = new TwitchService();

    const attemptToSignIn = async () => {
        accessToken.value = getAccesToken();
        if (!accessToken.value) return;

        const res = await twitchService.validateToken();
        user.value = (await twitchService.getUser([res.login])).data[0];
    };

    const signOut = async () => {
        accessToken.value = null;
        user.value = null;
        localStorage.removeItem('access_token');
    };

    const getAccesToken = () => {
        return getTokenFromUrl() ?? LocalStorageService.getItem('access_token');
    };

    const getTokenFromUrl = () => {
        const _accessToken = window.location.hash.substring(1).split('&').map(hash => hash.split('='))[0][1];
        LocalStorageService.setItem('access_token', _accessToken);
        return _accessToken;
    };

    return {
        user,
        accessToken,
        attemptToSignIn,
        signOut,
    };
});
