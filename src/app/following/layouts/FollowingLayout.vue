<script setup lang="ts">
import { useLiveStore } from '../stores/live.store';

const liveStore = useLiveStore();
</script>

<template>
    <div class="following">
        <Section first hideHeader class="following__tabs">
            <PageTabs :title="liveStore.pageTabs.title" :pages="liveStore.pageTabs.paths" />
        </Section>

        <main class="following__body">
            <RouterView />
        </main>
    </div>
</template>
