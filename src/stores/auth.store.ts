import { defineStore } from 'pinia';
import { AuthService } from '../services/auth.service';
import { ref } from 'vue';

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
