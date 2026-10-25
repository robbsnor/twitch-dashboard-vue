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

        <Spinner v-else padding />
    </div>
</template>
