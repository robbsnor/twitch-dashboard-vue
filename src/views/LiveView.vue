<script setup lang="ts">
import FavouriteCards from '@/app/live/containers/FavouriteCards.vue';
import OtherCards from '@/app/live/containers/OtherCards.vue';
import { onMounted, ref } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../app/shared/models/twitch/followed-streams.model';
import { TwitchService } from '../app/shared/services/twitch.service';
import { MOCK_FAVOURITES } from '@/app/shared/mock-data/favourites.mock';
import Spinner from '@/app/shared/components/Spinner.vue';

const twitchService = new TwitchService();

const allStreams = ref<TwitchFollowedStreamWithUser[]>()
const favouriteStreams = ref<TwitchFollowedStreamWithUser[]>()
const otherStreams = ref<TwitchFollowedStreamWithUser[]>()

const favourites = ref<Number[]>();

onMounted(async () => {
    allStreams.value= await twitchService.getFollowedStreamsWithUsers()
    favourites.value = MOCK_FAVOURITES;
    favouriteStreams.value = allStreams.value.filter(stream => favourites.value?.includes(Number(stream.id)))
    otherStreams.value = allStreams.value.filter(stream => !favourites.value?.includes(Number(stream.id)))
})
</script>

<template>
    <div class="live" v-auto-animate>
        <template v-if="allStreams">
            <FavouriteCards :streams="favouriteStreams" />
            <OtherCards :streams="otherStreams" />
        </template>
        <Spinner v-else />
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.live {
}
</style>
