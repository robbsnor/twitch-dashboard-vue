<script setup lang="ts">
import StreamFilter from '../components/StreamFilter.vue';
import { useFollowingStore } from '../stores/following.store';
import FollowingCategory from './FollowingCategory.vue';

const followingStore = useFollowingStore();
</script>

<template>
    <Section title="Categories">
        <div class="relative -mx-4 2xl:mx-0">
            <div class="flex gap-4 flex-nowrap overflow-x-auto px-4 2xl:px-0">
                <template v-if="followingStore.groupedCategories.favourites.length">
                    <FollowingCategory
                        v-for="category in followingStore.groupedCategories.favourites"
                        :key="category.id"
                        :category="category"
                    />
                    <div class="w-[1px] bg-black-500 my-4 shrink-0"></div>
                </template>

                <FollowingCategory
                    v-for="category in followingStore.groupedCategories.other"
                    :key="category.id"
                    :category="category"
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
