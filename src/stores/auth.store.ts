import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { LocalStorageService } from '../services/localstorage.service';
import { TwitchService } from '../services/twitch.service';

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref<string | null>(null);
    const user = ref<any>();

    const signIn = async () => {
        accessToken.value = getAccesToken();
        const { login } = await TwitchService.validateToken();
        user.value = (await TwitchService.getUser([login])).data[0];
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
        const hashes = window.location.hash.substring(1).split('&').map(hash => hash.split('='));
        const tokens: any = {};

        hashes.forEach(hash => {
            const [key, val] = hash;
            tokens[key] = val;
        });

        Object.entries(tokens).forEach(([key, value]) => {
            LocalStorageService.setItem(key, value);
        });

        removeHashFromURL();

        return tokens.access_token as string;
    };

    const removeHashFromURL = () => history.pushState("", document.title, window.location.pathname + window.location.search);

    return {
        user,
        signIn,
        signOut,
    };
});
