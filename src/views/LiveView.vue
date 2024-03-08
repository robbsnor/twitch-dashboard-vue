<script setup lang="ts">
import Favourites from '@/app/live/containers/Favourites.vue';
import Other from '@/app/live/containers/Other.vue';
import { onMounted, ref } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../app/shared/models/twitch/followed-streams.model';
import { TwitchService } from '../app/shared/services/twitch.service';

const twitchService = new TwitchService();

const streams = ref<TwitchFollowedStreamWithUser[]>()

onMounted(async () => {
    streams.value = await twitchService.getFollowedStreamsWithUsers()
})
</script>

<template>
    <div v-if="streams" class="live">
        <Favourites :streams="streams" />
        <Other :streams="streams" />
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
</style>
