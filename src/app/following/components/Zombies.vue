<script setup lang="ts">
import { useTwitchApi } from '@/app/shared/composables/useTwitchApi.composable';
import type { TwitchStreamsWithUser } from '@/app/shared/models/twitch/streams-with-user.model';
import { onMounted, ref } from 'vue';
import CardLiveNormal from './CardLiveNormal.vue';

const twitchApi = useTwitchApi();

const loading = ref(true);
const streams = ref<TwitchStreamsWithUser[]>([]);

onMounted(async () => {
    loading.value = true;

    streams.value = await twitchApi.getStreamsWithUser({ gameIds: ['23894', '34134', '489401'] }, { maxItems: 100 });

    loading.value = false;
});
</script>

<template>
    <Container>
        <div class="grid md:grid-cols-4 gap-8">
            <CardLiveNormal v-for="stream in streams" :key="stream.id" :stream="stream" />
        </div>
        <Spinner v-if="loading" />
    </Container>
</template>
