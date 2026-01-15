import type { TwitchFollowedStreamWithUser } from '@/app/shared/models/twitch/followed-streams-with-user.model';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { TwitchService } from '@/app/shared/services/twitch.service';
import { useTwitchApi } from '@/app/shared/composables/twitch-api.composable';

interface Category {
    name?: string;
    viewers: number;
    amountOfStreamers: number;
    id: number;
    image?: string;
}

export const useFollowingStore = defineStore('following', () => {
    const twitchApi = useTwitchApi();
    const filter = ref<string>();
    const streamsLastFetchedOn = ref<number>();
    const streams = ref<TwitchFollowedStreamWithUser[]>();
    const categories = ref<Category[]>();
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

    const filteredStreams = computed(() => {
        if (!streams.value?.length || !filter.value) return streams.value;

        const query = filter.value.toLowerCase();
        return streams.value.filter(({ user_name, game_name, title }) => {
            return [user_name, game_name, title].some((field) => field?.toLowerCase().includes(query));
        });
    });

    const categoriesList = computed(() => {
        if (!categories.value?.length) return;

        const catNames: string[] = categories.value.map((c) => c.name).filter((name): name is string => !!name);
        const orderedCatNames = catNames.sort((a, b) => a.localeCompare(b));
        return orderedCatNames;
    });

    const fetchAll = async () => {
        try {
            const hasFetchedBefore = !!streamsLastFetchedOn.value;
            if (hasFetchedBefore) loading.value = false;

            await fetchStreams();
            await fetchCategoies();
        } finally {
            loading.value = false;
        }
    };

    const fetchStreams = async () => {
        streamsLastFetchedOn.value = new Date().getTime();
        streams.value = await twitchApi.getFollowedStreamsWithUser();
    };

    const fetchCategoies = async () => {
        if (!streams.value) return;

        const categoryIds = [...new Set(streams.value.map((stream) => Number(stream.game_id)))].filter(Boolean);
        const twitchCategories = (await twitchApi.getGames({ ids: categoryIds })).data;

        categories.value = streams.value
            .reduce((acc, stream) => {
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
                        image: image ? TwitchService.getGameThumbnail(image, 100) : undefined,
                    });
                }

                return acc;
            }, [] as Category[])
            .sort((a, b) => b.viewers - a.viewers);
    };

    return {
        pageTabs,
        filter,
        streamsLastFetchedOn,
        streams,
        categories,
        filteredStreams,
        categoriesList,
        loading,

        fetchAll,
        fetchStreams,
        fetchCategoies,
    };
});
