<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { TitleService } from '../../shared/services/title.service';
import FavouriteStreams from '../components/FavouriteStreams.vue';
import NonFavouriteStreams from '../components/NonFavouriteStreams.vue';
import { useFollowingStore } from '../stores/following.store';
import { useWindowFocus } from '@vueuse/core';
import { useFavouriteStore } from '../../shared/stores/favourites.store';
import { LiveService } from '../services/live.service';
import StreamFilter from '../components/StreamFilter.vue';

TitleService.setTitle('Live');
const followingStore = useFollowingStore();
const favourtieStore = useFavouriteStore();

const focused = useWindowFocus();

onMounted(async () => {
    await followingStore.fetchAll();
});

const favouriteStreams = computed(() => {
    if (!followingStore.filteredStreams) return;
    return LiveService.getFavourites(favourtieStore.favouriteStreamerIds, followingStore.filteredStreams);
});

const nonFavouriteStreams = computed(() => {
    if (!followingStore.filteredStreams) return;
    return LiveService.getNonFavourites(favourtieStore.favouriteStreamerIds, followingStore.filteredStreams);
});

watch(focused, async (isFocused) => {
    if (!isFocused) return;
    await followingStore.fetchAll();
});
</script>

<template>
    <template v-if="!followingStore.loading">
        <Section title="Categories">
            <div class="relative -mx-4 2xl:mx-0">
                <div class="flex gap-4 flex-nowrap overflow-x-auto px-4 2xl:px-0" v-fade-stagger>
                    <img
                        v-for="category in followingStore.categories"
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
                        class="bg-linear-to-r from-black/0 to-black absolute top-0 right-0 bottom-0 w-8 shrink-0 pointer-events-none"
                    ></div>
                </div>
            </div>

            <template #actions>
                <div class="w-full md:max-w-85">
                    <StreamFilter class="filter" :categories="followingStore.categoriesList" />
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
