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

const loading = ref(true);
const streams = ref<TwitchFollowedStreamWithUser[]>();
const categories = ref<Category[]>();
const focused = useWindowFocus();
const scheduleUsers = ref<TwitchUser[]>();
const schedules = ref<TwitchSchedule[]>();

onMounted(async () => {
    loading.value = true;
    await init();
    loading.value = false;
});

const init = async () => {
    await fetchStreams();
    await fetchCategoies();
};

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
    if (!streams.value || !followingStore.filter) return streams.value;

    const query = followingStore.filter.toLowerCase();
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
    followingStore.streamsLastFetchedOn = new Date().getTime();
    streams.value = await twitchApiService.getFollowedStreamsWithUser();
};

const refetch = async () => {
    if (!followingStore.streamsLastFetchedOn) return;

    const isLongerThan10SecAgo = new Date().getTime() - followingStore.streamsLastFetchedOn > 1000 * 10;
    if (!isLongerThan10SecAgo) return;

    await init();
};

watch(focused, async (isFocused) => {
    if (!isFocused) return;

    await refetch();
});
</script>

<template>
    <template v-if="!loading">
        <Section title="Categories">
            <div class="relative -mx-4 2xl:mx-0">
                <div class="flex gap-4 flex-nowrap overflow-x-auto px-4 2xl:px-0" v-fade-stagger>
                    <img
                        v-for="category in categories"
                        :key="category.id"
                        :src="category.image"
                        alt="category"
                        class="shrink-0 transition-all rounded-md cursor-pointer"
                        @click="followingStore.filter = category.name"
                        :style="{ opacity: followingStore.filter === category.name ? 1 : 0.7 }"
                    />
                    <!-- <div
                        v-for="category in categories"
                        :key="category.id"
                        alt="category"
                        class="group shrink-0 bg-red-300 transition-all rounded-md cursor-pointer overflow-hidden relative w-32"
                        @click="followingStore.filter = category.name"
                        :style="{ opacity: followingStore.filter === category.name ? 1 : 0.7 }"
                    >
                        <img :src="category.image" class="w-full" />
                        <div
                            class="group-hover:opacity-100 opacity-0f absolute bottom-0 left-0 right-0 bg-black/50 p-2"
                        >
                            <div class="line-clamp-2">{{ category.amountOfStreamers }}</div>
                        </div>
                    </div> -->
                    <div
                        class="bg-linear-to-r from-black/0 to-black absolute top-0 right-0 bottom-0 w-8 shrink-0"
                    ></div>
                </div>
            </div>

            <template #actions>
                <div class="w-full md:max-w-85">
                    <StreamFilter class="filter" :categories="categoriesList" />
                </div>
            </template>
        </Section>

        <FavouriteStreams v-if="favouriteStreams" :streams="favouriteStreams" />

        <Section>
            <ZigZag />
        </Section>

        <NonFavouriteStreams v-if="nonFavouriteStreams" :streams="nonFavouriteStreams" />

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
            <div class="flex flex-col justify-center items-center gap-5">
                <a href="https://www.twitch.tv/directory/following/videos" target="_blank">
                    <Button color="secondary" icon="twitch">Continue Watching</Button>
                </a>
            </div>
        </Section>
    </template>

    <Spinner v-else padding />
</template>
