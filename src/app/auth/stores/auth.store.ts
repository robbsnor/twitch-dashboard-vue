import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AuthService } from '../services/auth.service';
import type { TwitchUser } from '../../shared/models/twitch/users.model';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<TwitchUser>();
    const accessToken = ref<string>();

    const signIn = async () => {
        console.log('Signing in...');
        user.value = await AuthService.signIn();
        console.log(user.value);
        accessToken.value = AuthService.getAccessToken();
    };

    const signOut = async () => {
        await AuthService.signOut();
        user.value = undefined;
    };

    return {
        user,
        accessToken,
        signIn,
        signOut,
    };
});
