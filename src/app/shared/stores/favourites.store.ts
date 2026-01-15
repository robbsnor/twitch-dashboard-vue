import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { supabase } from '@/app/supabase';
import type { Tables } from '@/app/database.types';

export const useFavouriteStore = defineStore('favourite', () => {
    const favouriteUsers = ref<Tables<'favourite_users'>[]>();
    const favouriteUserIds = computed(() => favouriteUsers.value?.map((user) => user.user_id) || []);
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

    onMounted(async () => {
        await fetchFavouriteUsers();
    });

    async function fetchFavouriteUsers() {
        const { data, error } = await supabase.from('favourite_users').select('*').order('order', { ascending: true });
        if (error) throw error;

        favouriteUsers.value = data;
    }

    return {
        favouriteCategories,
        favouriteUsers,
        favouriteUserIds,

        fetchFavouriteUsers,
    };
});
