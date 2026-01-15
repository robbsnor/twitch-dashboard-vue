import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { supabase } from '@/app/supabase';
import type { Tables } from '@/app/database.types';
import { useTwitchApi } from '../composables/twitch-api.composable';

export const useFavouriteStore = defineStore('favourite', () => {
    const twitchApi = useTwitchApi();
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

    async function init() {
        await fetchFavouriteUsers();
    }

    async function fetchFavouriteUsers() {
        const { data, error } = await supabase.from('favourite_users').select('*').order('order', { ascending: true });
        if (error) throw error;

        favouriteUsers.value = data;
    }

    async function fetchTwitchFavouriteUsers() {
        const followedStreamsWithUser = await twitchApi.getUsers({ ids: favouriteUserIds.value });
        console.log(followedStreamsWithUser);

        console.log('foooofooo');
    }

    return {
        favouriteCategories,
        favouriteUsers,
        favouriteUserIds,

        init,
        fetchTwitchFavouriteUsers,
    };
});
