<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import { TitleService } from '../../shared/services/title.service';
import FavouriteStreams from '../components/FavouriteStreams.vue';
import NonFavouriteStreams from '../components/NonFavouriteStreams.vue';
import { useFollowingStore } from '../stores/following.store';
import Schedule from '../components/Schedule.vue';
import { computedAsync, useWindowFocus } from '@vueuse/core';
import { useToast } from 'vue-toast-notification';
import type { TwitchSchedule } from '@/app/shared/models/twitch/schedule.model';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import { TwitchApiService } from '../../shared/services/twitch-api.service';
import { useFavouriteStore } from '../../shared/stores/favourites.store';
import { LiveService } from '../services/live.service';
import type { TwitchFollowedStreamWithUser } from '@/app/shared/models/twitch/followed-streams-with-user.model';
import { TwitchService } from '@/app/shared/services/twitch.service';
import StreamFilter from '../components/StreamFilter.vue';

interface Category {
    name?: string;
    viewers: number;
    amountOfStreamers: number;
    id: number;
    image?: string;
}

TitleService.setTitle('Live');
const followingStore = useFollowingStore();
const favourtieStore = useFavouriteStore();
const twitchApiService = new TwitchApiService();

const { filter, streamsLastFetchedOn } = storeToRefs(followingStore);
const loading = ref(true);
const streams = ref<TwitchFollowedStreamWithUser[]>();
const categories = ref<Category[]>();
const focused = useWindowFocus();
const scheduleUsers = ref<TwitchUser[]>();
const schedules = ref<TwitchSchedule[]>();

onMounted(async () => {
    loading.value = true;
    await fetchStreams();
    await fetchCategoies();
    loading.value = false;
});

const fetchCategoies = async () => {
    if (!streams.value) return;

    const categoryIds = [...new Set(streams.value.map((stream) => Number(stream.game_id)))].filter(Boolean);
    const twitchCategories = (await twitchApiService.getGames({ ids: categoryIds })).data;

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

const categoriesList = computed(() => {
    if (!categories.value?.length) return;

    const catNames: string[] = categories.value.map((c) => c.name).filter((name): name is string => !!name);
    const orderedCatNames = catNames.sort((a, b) => a.localeCompare(b));
    return orderedCatNames;
});

const filteredStreams = computed(() => {
    if (!streams.value || !filter.value) return streams.value;

    const query = filter.value.toLowerCase();
    return streams.value.filter(({ user_name, game_name, title }) => {
        return [user_name, game_name, title].some((field) => field?.toLowerCase().includes(query));
    });
});

const favouriteStreams = computed(() => {
    if (!filteredStreams.value) return;

    return LiveService.getFavourites(favourtieStore.favouriteStreamerIds, filteredStreams.value);
});

const nonFavouriteStreams = computed(() => {
    if (!filteredStreams.value) return;

    return LiveService.getNonFavourites(favourtieStore.favouriteStreamerIds, filteredStreams.value);
});

const fetchStreams = async () => {
    streamsLastFetchedOn.value = new Date().getTime();
    streams.value = await twitchApiService.getFollowedStreamsWithUser();
};

const refetchStreams = async () => {
    if (!streamsLastFetchedOn.value) return;

    const isLongerThan30SecAgo = new Date().getTime() - streamsLastFetchedOn.value > 1000 * 30;
    if (!isLongerThan30SecAgo) return;

    fetchStreams();
};

watch(focused, (isFocused) => {
    if (!isFocused) return;
    refetchStreams();
});
</script>

<template>
    <template v-if="!loading">
        <Section title="Categories">
            <div style="position: relative">
                <div style="display: flex; gap: 1rem; flex-wrap: nowrap; overflow-x: auto; padding-right: 30px">
                    <img
                        v-for="category in categories"
                        :key="category.id"
                        :src="category.image"
                        alt="category"
                        style="flex-shrink: 0; transition: 0.2s; border-radius: 4px"
                        @click="filter = category.name"
                        :style="{ opacity: filter === category.name ? 1 : 0.7 }"
                    />
                    <div
                        style="position: absolute; top: 0; right: 0; bottom: 0; width: 30px; flex-shrink: 0"
                        class="fade"
                    ></div>
                </div>
            </div>

            <template #actions>
                <StreamFilter class="filter" v-model:filter="filter" :categories="categoriesList" />
            </template>
        </Section>

        <FavouriteStreams v-if="favouriteStreams" v-model:filter="filter" :streams="favouriteStreams" />

        <Section>
            <ZigZag />
        </Section>

        <NonFavouriteStreams v-if="nonFavouriteStreams" v-model:filter="filter" :streams="nonFavouriteStreams" />

        <Section>
            <ZigZag></ZigZag>
        </Section>

        <template v-if="schedules && scheduleUsers">
            <Schedule :schedules="schedules" :users="scheduleUsers" />

            <Section>
                <ZigZag></ZigZag>
            </Section>
        </template>

        <Section>
            <div class="button-wrapper">
                <a href="https://www.twitch.tv/directory/following/videos" target="_blank">
                    <Button color="secondary" icon="twitch">Continue Watching</Button>
                </a>
            </div>
        </Section>
    </template>

    <Spinner v-else padding />
</template>

<style scoped lang="scss">
.button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: rem(20px);
}

.fade {
    background: linear-gradient(to left, rgba(black, 1), rgba(black, 0));
}
</style>
