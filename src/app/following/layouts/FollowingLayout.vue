<script setup lang="ts">
import { ref } from 'vue';
import { useFollowingStore } from '../stores/following.store';

const followingStore = useFollowingStore();
const pages = ref([
    {
        name: 'Live',
        path: '/following/live',
    },
    {
        name: 'Users',
        path: '/following/users',
    },
    {
        name: 'Games',
        path: '/following/games',
    },
]);
</script>

<template>
    <div
        class="fixed bottom-4 left-4 right-4 bg-black-100 border border-black-200 rounded-[10px] z-50 flex gap-2 justify-around p-1 md:hidden"
    >
        <RouterLink
            v-for="page in pages"
            :key="page.name"
            :to="page.path"
            class="w-full flex items-center justify-center py-3 rounded-md transition"
            :class="{
                'hover:bg-black-200 text-muted': $route.path !== page.path,
                'bg-black-500': $route.path === page.path,
            }"
        >
            {{ page.name }}
        </RouterLink>
    </div>

    <Section first class="max-md:hidden">
        <PageTabs title="Following" :pages="pages" />
    </Section>

    <RouterView />
</template>
