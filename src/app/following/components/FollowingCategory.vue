<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFollowingStore, type Category } from '../stores/following.store';

const followingStore = useFollowingStore();

const props = withDefaults(
    defineProps<{
        category: Category;
    }>(),
    {}
);
</script>

<template>
    <div class="shrink-0">
        <img
            :src="props.category.image"
            :alt="props.category.name"
            class="shrink-0 transition-all rounded-md cursor-pointer w-24"
            @click="followingStore.filter = props.category.name"
            :style="{ opacity: followingStore.filter === props.category.name ? 1 : 0.7 }"
        />
        <div
            class="bg-linear-to-r from-black/0 to-black absolute top-0 right-0 bottom-0 w-8 shrink-0 pointer-events-none"
        ></div>
    </div>
</template>
