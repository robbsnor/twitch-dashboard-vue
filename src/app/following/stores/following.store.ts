import { useFavouriteStore } from './../../shared/stores/favourites.store';
import type { TwitchFollowedStreamWithUser } from '@/app/shared/models/twitch/followed-streams-with-user.model';
import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { TwitchService } from '@/app/shared/services/twitch.service';
import { useTwitchApi } from '@/app/shared/composables/useTwitchApi.composable';
import { LiveService } from '../services/live.service';
import { useStorage } from '@vueuse/core';
import type { TwitchGame } from '@/app/shared/models/twitch/games.model';

export interface Category {
    name?: string;
    viewers: number;
    amountOfStreamers: number;
    id: string;
    image?: string;
}

export const useFollowingStore = defineStore('following', () => {
    const twitchApi = useTwitchApi();
    const favouriteStore = useFavouriteStore();

    const sortFavouritesByViewers = useStorage<boolean>('sortFavouritesByViewers', false);
    const filter = ref<string>();
    const streamsLastFetchedOn = ref<number>();
    const streams = ref<TwitchFollowedStreamWithUser[]>([]);
    const twitchCategories = ref<TwitchGame[]>([]);
    const loading = ref(true);

    const categories = computed<Category[]>(() =>
        streams.value
            .reduce<Category[]>((acc, stream) => {
                if (!stream.game_name || !stream.game_id) return acc;

                const category = acc.find((cat) => cat.name === stream.game_name);
                const image = twitchCategories.value.find(
                    (cat) => Number(cat.id) === Number(stream.game_id)
                )?.box_art_url;

                if (category) {
                    category.viewers += stream.viewer_count;
                    category.amountOfStreamers += 1;
                } else {
                    acc.push({
                        name: stream.game_name,
                        viewers: stream.viewer_count,
                        amountOfStreamers: 1,
                        id: stream.game_id,
                        image: image ? TwitchService.getGameThumbnail(image, 120) : undefined,
                    });
                }

                return acc;
            }, [])
            .sort((a, b) => b.viewers - a.viewers)
    );

    const groupedCategories = computed<{
        favourites: Category[];
        other: Category[];
    }>(() => {
        const favourites: Category[] = [];
        const other: Category[] = [];

        for (const category of categories.value) {
            if (favouriteStore.categoryIds.includes(category.id)) {
                favourites.push(category);
            } else {
                other.push(category);
            }
        }

        const sortByViewers = (a: Category, b: Category) => b.viewers - a.viewers;
        return {
            favourites: favourites.sort(sortByViewers),
            other: other.sort(sortByViewers),
        };
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
        } catch (error) {
            throw error;
        } finally {
            loading.value = false;
        }
    }

    async function fetchStreams() {
        streamsLastFetchedOn.value = new Date().getTime();
        streams.value = await twitchApi.getFollowedStreamsWithUser();
    }

    async function fetchCategories() {
        if (!streams.value.length) {
            twitchCategories.value = [];
            return;
        }

        const categoryIds = [...new Set(streams.value.map((stream) => stream.game_id))].filter(Boolean);

        // @ts-ignore
        const res = await twitchApi.getGames({ ids: categoryIds });
        twitchCategories.value = res.data;
    }

    return {
        filter,
        streamsLastFetchedOn,
        streams,
        categories,
        groupedCategories,
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
