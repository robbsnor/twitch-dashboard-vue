import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { supabase } from '@/app/supabase';
import type { Tables, TablesInsert } from '@/app/database.types';
import { useAuthStore } from '@/app/auth/stores/auth.store';
import _ from 'lodash';
import { v4 } from 'uuid';
import { useTwitchApi } from '../composables/useTwitchApi.composable';
import type { TwitchUser } from '../models/twitch/users.model';
import type { TwitchGame } from '../models/twitch/games.model';

export const useFavouriteStore = defineStore('favourite', () => {
    const authStore = useAuthStore();
    const twitchApi = useTwitchApi();

    //
    // users
    //
    const users = ref<Tables<'favourite_users'>[]>([]);
    const userIds = computed(() => users.value.map((user) => user.user_id) || []);
    const twitchUsers = ref<TwitchUser[]>([]);

    onMounted(async () => {
        fetchUsers();
        fetchCategories();
    });

    async function fetchUsers() {
        await fetchFavUsers();
        await fetchTwitchUsers();
    }

    async function setUsers(ids: number[]) {
        // remove
        const idsToRemove = userIds.value.filter((id) => !ids.includes(id));

        if (idsToRemove.length) {
            const { error: deleteError } = await supabase.from('favourite_users').delete().in('user_id', idsToRemove);
            if (deleteError) throw deleteError;
        }

        // upsert
        const _users: TablesInsert<'favourite_users'>[] = ids.map((id, i) => ({
            user_id: id,
            order: i,
            owner_id: authStore.session!.user.id!,
        }));

        const { error: insertError } = await supabase.from('favourite_users').upsert(_users, { onConflict: 'user_id' });
        if (insertError) throw insertError;

        await fetchUsers();
    }

    async function addUser({ user_id, index }: { user_id: number; index: number }) {
        let favUsers: TablesInsert<'favourite_users'>[] = _.cloneDeep(users.value);

        favUsers.splice(index, 0, {
            id: v4(),
            user_id,
            order: 0,
            owner_id: authStore.session!.user.id!,
        });

        favUsers = favUsers.map((item, idx) => ({
            ...item,
            order: idx,
        }));

        const { error } = await supabase.from('favourite_users').upsert(favUsers, { onConflict: 'user_id' });
        if (error) throw error;

        await fetchUsers();
    }

    async function removeUser(userId: number) {
        const { error } = await supabase.from('favourite_users').delete().eq('user_id', userId);
        if (error) throw error;

        await fetchUsers();
    }

    async function fetchFavUsers() {
        const { data, error } = await supabase.from('favourite_users').select('*').order('order', { ascending: true });
        if (error) throw error;

        users.value = data;
    }

    async function fetchTwitchUsers() {
        const res = await twitchApi.getUsers({ ids: userIds.value });
        twitchUsers.value = res.data;
    }

    function isFavourite(userId: number) {
        return userIds.value.includes(userId);
    }

    //
    // categories
    //
    const loadingCategories = ref(true);
    const categories = ref<Tables<'favourite_categories'>[]>([]);
    const categoryIds = computed(() => categories.value.map((cat) => cat.category_id));
    const twitchCategories = ref<TwitchGame[]>([]);
    // const categories = [
    //     'Call of Duty: Black Ops',
    //     'Call of Duty: Black Ops II',
    //     'Call of Duty: Black Ops III',
    //     'Dead by Daylight',
    //     'Super Mario 64',
    //     'Super Mario Sunshine',
    //     'Super Mario Galaxy',
    //     'Super Mario Galaxy 2',
    //     'Software and Game Development',
    //     'Shapez 2',
    //     'VALORANT',
    //     'Rocket League',
    //     'Minecraft',
    //     'Apex Legends',
    //     'Beat Saber',
    // ];

    async function fetchCategories() {
        loadingCategories.value = true;

        await fetchFavCategories();
        await fetchTwitchCategoriers();

        loadingCategories.value = false;
    }

    async function fetchFavCategories() {
        const { data, error } = await supabase.from('favourite_categories').select();
        if (error) return error;

        categories.value = data.sort();
    }

    async function fetchTwitchCategoriers() {
        if (!categoryIds.value.length) {
            twitchCategories.value = [];
            return;
        }

        const res = await twitchApi.getGames({ ids: categoryIds.value });
        twitchCategories.value = res.data.sort((a, b) => a.name.localeCompare(b.name));
    }

    async function addCategory(id: string) {
        const { error } = await supabase.from('favourite_categories').upsert(
            {
                owner_id: authStore.session!.user.id!,
                category_id: id,
                order: 999,
            },
            { onConflict: 'owner_id,category_id' }
        );

        if (error) return error;

        await fetchCategories();
    }

    async function removeCategory(id: string) {
        console.log('removing...');
        console.log(id);
        const { error } = await supabase.from('favourite_categories').delete().eq('category_id', id);
        if (error) return error;

        await fetchCategories();
    }

    return {
        // users
        users,
        userIds,
        twitchUsers,

        addUser,
        removeUser,
        setUsers,
        isFavourite,

        // categories
        loadingCategories,
        categories,
        categoryIds,
        twitchCategories,

        addCategory,
        removeCategory,
    };
});
