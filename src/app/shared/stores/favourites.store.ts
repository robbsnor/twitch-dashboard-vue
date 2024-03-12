import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import { MOCK_FAVOURITES_FLUUMP, MOCK_FAVOURITES_HOPP } from '../mock-data/favourites.mock';
import { useAuthStore } from '../../auth/stores/auth.store';

export const useFavouriteStore = defineStore('favourite', () => {
    const favourites = ref<number[]>();
    const authStore = useAuthStore();

    const getFavourites = () => {
        const login = authStore.user?.login;

        if (login === 'robbsnor') {
            return MOCK_FAVOURITES_HOPP;
        } else if (login === 'lunpia_') {
            return MOCK_FAVOURITES_FLUUMP;
        }
        return [];
    };


    return {
        getFavourites,
    };
});
