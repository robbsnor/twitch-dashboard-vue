import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { supabase } from '@/app/supabase';
import type { Tables, TablesInsert } from '@/app/database.types';
import { useAuthStore } from '@/app/auth/stores/auth.store';
import _ from 'lodash';
import { v4 } from 'uuid';

export const useFavouriteStore = defineStore('favourite', () => {
    const authStore = useAuthStore();
    const favouriteUsers = ref<Tables<'favourite_users'>[]>([]);
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

    async function setFavouriteUsers(userIds: number[]) {
        const users: TablesInsert<'favourite_users'>[] = userIds.map((user_id, i) => ({
            id: v4(),
            user_id,
            order: i,
            owner_id: authStore.session!.user.id!,
        }));

        const { error: deleteError } = await supabase
            .from('favourite_users')
            .delete()
            .eq('owner_id', authStore.session!.user.id!);
        if (deleteError) throw deleteError;

        const { error: insertError } = await supabase.from('favourite_users').insert(users);
        if (insertError) throw insertError;

        await fetchFavouriteUsers();
    }

    async function addFavouriteUser({ user_id, index }: { user_id: number; index: number }) {
        let favUsers: TablesInsert<'favourite_users'>[] = _.cloneDeep(favouriteUsers.value);

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

        await fetchFavouriteUsers();
    }

    async function removeFavouriteUser(userId: number) {
        const { error } = await supabase.from('favourite_users').delete().eq('user_id', userId);
        if (error) throw error;

        await fetchFavouriteUsers();
    }

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
        addFavouriteUser,
        removeFavouriteUser,
        setFavouriteUsers,
    };
});
