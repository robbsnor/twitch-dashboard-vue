import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TwitchUser } from './../models/twitch/users.model';
import { useTwitchApi } from '../composables/twitch-api.composable';

export const useTwitchStore = defineStore('twitchStore', () => {
    const twitchApi = useTwitchApi();
    const users = ref<TwitchUser[]>([]);

    const getUsers = async (user: { ids?: number[]; logins?: string[] }) => {
        const userIdsToFetch =
            user.ids?.filter((id) => !users.value.find((storedUser) => Number(storedUser.id) === id)) ?? [];
        let newUsers: TwitchUser[] = [];

        console.log(userIdsToFetch);

        if (userIdsToFetch.length !== 0) {
            const res = await twitchApi.getUsers({ ids: userIdsToFetch });
            newUsers = res.data;
        }

        users.value = [...users.value, ...newUsers];
        return users.value;
    };

    return {
        getUsers,
    };
});
