import { defineStore } from 'pinia';
import { useAuthStore } from '../../auth/stores/auth.store';
import { MOCK_FAVOURITES_FLUUMP, MOCK_FAVOURITES_HOPP } from '../mock-data/favourites.mock';
import { computed } from 'vue';

export const useFavouriteStore = defineStore('favourite', () => {
    const authStore = useAuthStore();
    const favouriteCategories = [
        'Call of Duty: Black Ops',
        'Call of Duty: Black Ops II',
        'Call of Duty: Black Ops III',
        'Super Mario 64',
        'Super Mario Sunshine',
        'Super Mario Galaxy',
        'Super Mario Galaxy 2',
        'Software and Game Development',
        'Shapez 2',
        'VALORANT',
        'Rocket League',
        'Minecraft',
        'Apex Legends',
        'Beat Saber',
    ];

    const favouriteStreamerIds = computed(() => {
        const login = authStore.user?.login;

        if (login === 'robbsnor') return MOCK_FAVOURITES_HOPP;
        if (login === 'lunpia_') return MOCK_FAVOURITES_FLUUMP;
        return [];
    });

    return {
        favouriteCategories,
        favouriteStreamerIds,
    };
});
