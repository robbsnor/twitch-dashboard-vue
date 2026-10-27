<script setup lang="ts">
import { computed } from 'vue';
import { useFollowingStore } from '../stores/following.store';

const followingStore = useFollowingStore();
const queryIsInCategory = computed(() =>
    [...followingStore.groupedCategories.favourites, ...followingStore.groupedCategories.other].some(
        (category) => category.name?.toLocaleLowerCase() === followingStore.filter?.toLocaleLowerCase()
    )
);
</script>

<template>
    <Empty v-if="queryIsInCategory" :description="`Find other streams playing ${followingStore.filter}`">
        <v-btn color="primary" variant="tonal" :to="{ name: 'game', params: { gameName: followingStore.filter } }">
            Explore category
        </v-btn>
    </Empty>
</template>
