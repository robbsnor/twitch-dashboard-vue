<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TwitchService } from '../app/shared/services/twitch.service';

import Section from '@/app/shared/components/Section.vue';
import type { TwitchFollowedStream, TwitchFollowedStreamWithUser } from '../app/shared/models/twitch/followed-streams.model';
import FavouriteCards from '../app/live/containers/FavouriteCards.vue';

const twitchService = new TwitchService();

const streams = ref<TwitchFollowedStreamWithUser[]>()

onMounted(async () => {
    streams.value = await twitchService.getFollowedStreamsWithUsers()
})
</script>

<template>
    <div v-if="streams" class="live">
        <FavouriteCards :streams="streams" />

        <Section title="Live channels"></Section>
        <Section title="Continue watching"></Section>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.live {
    padding-top: $header-height;
}
</style>../app/live/components/FavouriteCards.vue
