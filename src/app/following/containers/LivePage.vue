<script setup lang="ts">
import { watch } from 'vue';
import { TitleService } from '../../shared/services/title.service';
import FavouriteStreams from '../components/FavouriteStreams.vue';
import NonFavouriteStreams from '../components/NonFavouriteStreams.vue';
import { useFollowingStore } from '../stores/following.store';
import { useWindowFocus } from '@vueuse/core';
import NoResults from '../components/NoResults.vue';
import Categories from '../components/Categories.vue';
import ContinueWatching from '../components/ContinueWatching.vue';

TitleService.setTitle('Live');
const followingStore = useFollowingStore();
const focused = useWindowFocus();

watch(focused, async (isFocused) => {
    if (!isFocused) return;
    await followingStore.fetchAll();
});
</script>

<template>
    <template v-if="!followingStore.loading">
        <Categories />
        <FavouriteStreams />
        <NonFavouriteStreams />
        <NoResults />
        <ContinueWatching />
    </template>

    <Spinner v-else padding />
</template>
