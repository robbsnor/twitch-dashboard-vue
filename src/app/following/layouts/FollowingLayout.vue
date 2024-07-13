<script setup lang="ts">
import { useFollowingStore } from '../stores/following.store';

const followingStore = useFollowingStore();
</script>

<template>
    <div class="following">
        <Section first hideHeader class="following__tabs">
            <PageTabs :title="followingStore.pageTabs.title" :pages="followingStore.pageTabs.paths" />
        </Section>

        <RouterView />
    </div>
</template>
