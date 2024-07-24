<script setup lang="ts">
import { TwitchApiService } from '@/app/shared/services/twitch-api.service';
import { useWindowFocus } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { nextTick, onMounted, ref, watch } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams.model';
import { TitleService } from '../../shared/services/title.service';
import { useFavouriteStore } from '../../shared/stores/favourites.store';
import FavouriteStreams from '../components/FavouriteStreams.vue';
import NonFavouriteStreams from '../components/NonFavouriteStreams.vue';
import { LiveService } from '../services/live.service';
import { useFollowingStore } from '../stores/following.store';

TitleService.setTitle('Live');
const favourtieStore = useFavouriteStore();
const followingStore = useFollowingStore();
const focused = useWindowFocus();
const twitchApiService = new TwitchApiService();

const { filter } = storeToRefs(followingStore);

const favouriteIds = ref<number[]>(favourtieStore.getFavouriteStreamers());
const allStreams = ref<TwitchFollowedStreamWithUser[]>();
const favouriteStreams = ref<TwitchFollowedStreamWithUser[]>();
const nonFavouriteStreams = ref<TwitchFollowedStreamWithUser[]>();
const lastFetchedOn = ref<number>(0);

onMounted(async () => {
    fetchStreams();
});

const fetchStreams = async () => {
    console.log(`Fetcing streams..: ${new Date()}`);
    lastFetchedOn.value = Date.now();

    allStreams.value = await twitchApiService.getFollowedStreamsWithUsers();
    favouriteStreams.value = undefined;
    nonFavouriteStreams.value = undefined;
    await nextTick();
    favouriteStreams.value = LiveService.getFavourites(favouriteIds.value, allStreams.value);
    nonFavouriteStreams.value = LiveService.getNonFavourites(favouriteIds.value, allStreams.value);
};

const refetchStreamsOnFocus = (isFocused: boolean) => {
    if (!isFocused) return;

    const isLongerThan1MinAgo = Date.now() - lastFetchedOn.value > 1 * 60 * 1000;
    if (!isLongerThan1MinAgo) return;

    fetchStreams();
};

watch(focused, (newFocused) => {
    refetchStreamsOnFocus(newFocused);
});
</script>

<template>
    <template v-if="allStreams">
        <FavouriteStreams :streams="favouriteStreams" />

        <Section hideHeader>
            <ZigZag />
        </Section>

        <NonFavouriteStreams
            v-model:filter="filter"
            :streams="nonFavouriteStreams"
        />
    </template>

    <Spinner v-else padding />
</template>

<style scoped lang="scss"></style>
