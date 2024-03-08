import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AuthService } from '../services/auth.service';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<any>();

    const signIn = async () => {
        const currentUser = await AuthService.signIn();
        user.value = currentUser;
    };

    const signOut = async () => {
        user.value = await AuthService.signOut();
    };

    return {
        user,
        signIn,
        signOut,
    };
});
