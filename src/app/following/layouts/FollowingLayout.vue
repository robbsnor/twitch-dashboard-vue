<script setup lang="ts">
import { useFollowingStore } from '../stores/following.store';

const followingStore = useFollowingStore();
</script>

<template>
    <Section first>
        <PageTabs :title="followingStore.pageTabs.title" :pages="followingStore.pageTabs.paths" />
    </Section>

    <RouterView />
</template>
