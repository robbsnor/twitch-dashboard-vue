<script setup lang="ts">
import { useWindowFocus } from '@vueuse/core';
import { onMounted, watch } from 'vue';
import { TitleService } from '../../shared/services/title.service';
import Categories from '../components/Categories.vue';
import ContinueWatching from '../components/ContinueWatching.vue';
import FavouriteStreams from '../components/FavouriteStreams.vue';
import NonFavouriteStreams from '../components/NonFavouriteStreams.vue';
import ExploreCategory from '../components/ExploreCategory.vue';
import NoResults from '../components/NoResults.vue';
import { useFollowingStore } from '../stores/following.store';
import { NumberService } from '@/app/shared/services/number.service';

TitleService.setTitle('Live');
const followingStore = useFollowingStore();
const focused = useWindowFocus();

onMounted(async () => {
    await followingStore.fetchAll();
});

watch(focused, async (isFocused) => {
    if (!isFocused) return;
    await followingStore.fetchAll();
});
</script>

<template>
    <div>
        <template v-if="!followingStore.loading">
            <Categories />
            <FavouriteStreams />
            <NonFavouriteStreams />
            <NoResults />
            <ExploreCategory />

            <Section>
                <ZigZag></ZigZag>
            </Section>
            <!-- <ContinueWatching /> -->
        </template>

        <Section v-else>
            <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="i in 3">
                    <div class="flex gap-4 items-center pb-4">
                        <Skeleton class="rounded-full w-14 aspect-square h-auto" />
                        <Skeleton :style="{ width: `${NumberService.generateRandomNumber(20, 40)}%` }" />
                        <Skeleton class="w-8 ml-auto" />
                    </div>

                    <Skeleton :style="{ width: `${NumberService.generateRandomNumber(60, 100)}%` }" class="mb-4" />
                    <Skeleton :style="{ width: `${NumberService.generateRandomNumber(40, 80)}%` }" class="mb-4" />

                    <Skeleton class="h-auto aspect-video" />
                </div>
            </div>
        </Section>
    </div>
</template>
