<script setup lang="ts">
import Favourites from '@/app/live/containers/Favourites.vue';
import Other from '@/app/live/containers/Other.vue';
import { onMounted, ref } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../app/shared/models/twitch/followed-streams.model';
import { TwitchService } from '../app/shared/services/twitch.service';
import { MOCK_FAVOURITES } from '@/app/shared/mock-data/favourites.mock';

const twitchService = new TwitchService();

const favouriteStreams = ref<TwitchFollowedStreamWithUser[]>([])
const otherStreams = ref<TwitchFollowedStreamWithUser[]>([])
const streams = ref<TwitchFollowedStreamWithUser[]>([])

onMounted(async () => {
    const streams = await twitchService.getFollowedStreamsWithUsers()
    favouriteStreams.value = streams.filter(stream => {
        // if stream.id is in MOCK_FAVOURITES, return stream
        return MOCK_FAVOURITES.includes(Number(stream.id))
    })

    otherStreams.value = streams.filter(stream => {
        // if stream.id is not in MOCK_FAVOURITES, return stream
        return !MOCK_FAVOURITES.includes(Number(stream.id))
    })
})
</script>

<template>
    <div class="live">
        <Favourites :streams="favouriteStreams" />
        <Other :streams="otherStreams" />
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
