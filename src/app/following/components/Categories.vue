<script setup lang="ts">
import { useFollowingStore } from '../stores/following.store';
import StreamFilter from '../components/StreamFilter.vue';

const followingStore = useFollowingStore();
</script>

<template>
    <Section title="Categories">
        <div class="relative -mx-4 2xl:mx-0">
            <div class="flex gap-4 flex-nowrap overflow-x-auto px-4 2xl:px-0" v-fade-stagger>
                <img
                    v-for="category in followingStore.categories"
                    :key="category.id"
                    :src="category.image"
                    alt="category"
                    class="shrink-0 transition-all rounded-md cursor-pointer w-24"
                    @click="followingStore.filter = category.name"
                    :style="{ opacity: followingStore.filter === category.name ? 1 : 0.7 }"
                />
                <div
                    class="bg-linear-to-r from-black/0 to-black absolute top-0 right-0 bottom-0 w-8 shrink-0 pointer-events-none"
                ></div>
            </div>
        </div>

        <template #actions>
            <div class="w-full md:max-w-85">
                <StreamFilter />
            </div>
        </template>
    </Section>
</template>
