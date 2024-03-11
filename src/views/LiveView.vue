<script setup lang="ts">
import FavouriteStreams from '@/app/live/containers/FavouriteStreams.vue';
import NonFavouriteStreams from '@/app/live/containers/NonFavouriteStreams.vue';
import { onMounted, ref } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../app/shared/models/twitch/followed-streams.model';
import { TwitchService } from '../app/shared/services/twitch.service';
import { MOCK_FAVOURITES_HOPP, MOCK_FAVOURITES_FLUUMP } from '@/app/shared/mock-data/favourites.mock';
import Spinner from '@/app/shared/components/Spinner.vue';
import { LiveService } from '@/app/live/services/live.service';
import { useAuthStore } from '@/app/auth/stores/auth.store';

const twitchService = new TwitchService();

const authStore = useAuthStore();

const favouritesList = ref<number[]>();

const allStreams = ref<TwitchFollowedStreamWithUser[]>();
const favouriteStreams = ref<TwitchFollowedStreamWithUser[]>();
const nonFavouriteStreams = ref<TwitchFollowedStreamWithUser[]>();

const determineFavourites = (username: string) => {
    if (username === 'robbsnor') {
       return MOCK_FAVOURITES_HOPP;
    } else if (username === 'lunpia_') {
       return MOCK_FAVOURITES_FLUUMP;
    }
    return [];
}

onMounted(async () => {
    favouritesList.value = determineFavourites(authStore.user?.login ?? '');

    allStreams.value = await twitchService.getFollowedStreamsWithUsers();
    favouriteStreams.value = LiveService.orderFavorites(favouritesList.value, allStreams.value);
    nonFavouriteStreams.value = allStreams.value.filter(stream => !favouritesList.value?.includes(Number(stream.id)));
})
</script>

<template>
    <div class="live" v-auto-animate>
        <template v-if="allStreams">
            <FavouriteStreams :streams="favouriteStreams" />
            <NonFavouriteStreams :streams="nonFavouriteStreams" />
        </template>

        <Spinner v-else />
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.live { }
</style>
