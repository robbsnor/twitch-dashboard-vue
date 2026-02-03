import { useFavouriteStore } from './../../shared/stores/favourites.store';
import type { TwitchFollowedStreamWithUser } from '@/app/shared/models/twitch/followed-streams-with-user.model';
import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { TwitchService } from '@/app/shared/services/twitch.service';
import { useTwitchApi } from '@/app/shared/composables/useTwitchApi.composable';
import { LiveService } from '../services/live.service';
import { useStorage } from '@vueuse/core';

interface Category {
    name?: string;
    viewers: number;
    amountOfStreamers: number;
    id: number;
    image?: string;
}

export const useFollowingStore = defineStore('following', () => {
    const twitchApi = useTwitchApi();
    const favouriteStore = useFavouriteStore();
    const sortFavouritesByViewers = useStorage<boolean>('sortFavouritesByViewers', false);
    const filter = ref<string>();
    const streamsLastFetchedOn = ref<number>();
    const streams = ref<TwitchFollowedStreamWithUser[]>([]);
    const categories = ref<Category[]>([]);
    const loading = ref(true);
    const pageTabs = {
        title: 'Following',
        paths: [
            {
                name: 'Live',
                path: '/following/live',
            },
            {
                name: 'Users',
                path: '/following/users',
            },
            {
                name: 'Games',
                path: '/following/games',
            },
        ],
    };

    onMounted(async () => {
        await fetchAll();
    });

    const favouriteStreams = computed(() => {
        const streams = LiveService.getFavouriteStreams(favouriteStore.userIds, filteredStreams.value);

        if (sortFavouritesByViewers.value) {
            return streams.sort((a, b) => b.viewer_count - a.viewer_count);
        }

        return streams;
    });

    const nonFavouriteStreams = computed(() => {
        return LiveService.getNonFavouriteStreams(favouriteStore.userIds, filteredStreams.value);
    });

    const filteredStreams = computed(() => {
        if (!streams.value.length || !filter.value) return streams.value;

        const query = filter.value.toLowerCase();
        return streams.value.filter(({ user_name, game_name, title }) => {
            return [user_name, game_name, title].some((field) => field?.toLowerCase().includes(query));
        });
    });

    const categoriesList = computed(() => {
        return categories.value
            .map((c) => c.name)
            .filter((name): name is string => !!name)
            .sort((a, b) => a.localeCompare(b));
    });

    async function fetchAll() {
        try {
            loading.value = true;
            const hasFetchedBefore = !!streamsLastFetchedOn.value;
            if (hasFetchedBefore) loading.value = false;

            await fetchStreams();
            await fetchCategories();
            loading.value = false;
        } catch (error) {
            throw error;
        }
    }

    async function fetchStreams() {
        streamsLastFetchedOn.value = new Date().getTime();
        streams.value = await twitchApi.getFollowedStreamsWithUser();
    }

    async function fetchCategories() {
        if (!streams.value.length) return;

        const categoryIds = [...new Set(streams.value.map((stream) => Number(stream.game_id)))].filter(Boolean);
        const twitchCategories = (await twitchApi.getGames({ ids: categoryIds })).data;

        categories.value = streams.value
            .reduce<Category[]>((acc, stream) => {
                if (!stream.game_name) return acc;

                const category = acc.find((cat) => cat.name === stream.game_name);
                const image = twitchCategories.find((cat) => Number(cat.id) === Number(stream.game_id))?.box_art_url;

                if (category) {
                    category.viewers += stream.viewer_count;
                    category.amountOfStreamers += 1;
                } else {
                    acc.push({
                        name: stream.game_name,
                        viewers: stream.viewer_count,
                        amountOfStreamers: 1,
                        id: Number(stream.game_id),
                        image: image ? TwitchService.getGameThumbnail(image, 120) : undefined,
                    });
                }

                return acc;
            }, [])
            .sort((a, b) => b.viewers - a.viewers);
    }

    return {
        pageTabs,
        filter,
        streamsLastFetchedOn,
        streams,
        categories,
        filteredStreams,
        categoriesList,
        loading,
        favouriteStreams,
        nonFavouriteStreams,
        sortFavouritesByViewers,

        fetchAll,
        fetchStreams,
        fetchCategories,
    };
});
