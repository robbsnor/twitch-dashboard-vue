<script setup lang="ts">
import { useFollowingStore } from '../stores/following.store';

const followingStore = useFollowingStore();
</script>

<template>
    <div
        class="fixed bottom-2 left-2 right-2 bg-black-100 border border-black-200 rounded-[10px] z-50 flex gap-2 justify-around p-1 md:hidden"
    >
        <RouterLink
            v-for="page in followingStore.pageTabs.paths"
            :key="page.name"
            :to="page.path"
            class="w-full flex items-center justify-center py-3 rounded-md transition"
            :class="{
                'hover:bg-black-200 text-muted': $route.path !== page.path,
                'bg-primary/10': $route.path === page.path,
            }"
        >
            {{ page.name }}
        </RouterLink>
    </div>

    <Section first class="max-md:hidden">
        <PageTabs :title="followingStore.pageTabs.title" :pages="followingStore.pageTabs.paths" />
    </Section>

    <RouterView />
</template>
