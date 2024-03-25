<script setup lang="ts">
import FavouriteStreams from '@/app/live/components/FavouriteStreams.vue';
import NonFavouriteStreams from '@/app/live/components/NonFavouriteStreams.vue';
import { LiveService } from '@/app/live/services/live.service';
import Spinner from '@/app/shared/components/Spinner.vue';
import ZigZag from '@/app/shared/components/ZigZag.vue';
import { onMounted, ref } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../app/shared/models/twitch/followed-streams.model';
import { TitleService } from '../app/shared/services/title.service';
import { TwitchService } from '../app/shared/services/twitch.service';
import { useFavouriteStore } from '../app/shared/stores/favourites.store';

TitleService.setTitle('Live');
const twitchService = new TwitchService();
const favourtieStore = useFavouriteStore();


const _allStreams = ref<TwitchFollowedStreamWithUser[]>();
const _favouriteStreams = ref<TwitchFollowedStreamWithUser[]>();
const _nonFavouriteStreams = ref<TwitchFollowedStreamWithUser[]>();

onMounted(async () => {
    const favouriteIds = favourtieStore.getFavourites();

    _allStreams.value = await twitchService.getFollowedStreamsWithUsers();
    _favouriteStreams.value = LiveService.orderFavorites(favouriteIds, _allStreams.value);
    _nonFavouriteStreams.value = _allStreams.value.filter(stream => !favouriteIds?.includes(Number(stream.id)));
})
</script>

<template>
    <div class="live">
        <template v-if="_allStreams">
            <FavouriteStreams :streams="_favouriteStreams" />
            <ZigZag />
            <NonFavouriteStreams :streams="_nonFavouriteStreams" />
        </template>

        <Spinner v-else padding />
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.live { }
</style>
