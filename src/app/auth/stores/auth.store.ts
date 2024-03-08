import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AuthService } from '../services/auth.service';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<any>();
    const accessToken = ref<string>();

    const signIn = async () => {
        user.value = await AuthService.signIn();
        accessToken.value = AuthService.getAccessToken();
    };

    const signOut = async () => {
        user.value = await AuthService.signOut();
    };

    return {
        user,
        accessToken,
        signIn,
        signOut,
    };
});
