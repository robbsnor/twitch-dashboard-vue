import { defineStore } from 'pinia';
import { useAuthStore } from '../../auth/stores/auth.store';
import { MOCK_FAVOURITES_FLUUMP, MOCK_FAVOURITES_HOPP } from '../mock-data/favourites.mock';

export const useFavouriteStore = defineStore('favourite', () => {
    const authStore = useAuthStore();

    const getFavouriteStreamers = () => {
        const login = authStore.user?.login;

        if (login === 'robbsnor') return MOCK_FAVOURITES_HOPP;
        if (login === 'lunpia_') return MOCK_FAVOURITES_FLUUMP;
        return [];
    };

    const getFavouriteCategories = () => {
        return [
            'Call of Duty: Black Ops',
            'Minecraft',
            'Apex Legends',
        ];
    };

    return {
        getFavouriteStreamers,
        getFavouriteCategories,
    };
});
