<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TitleService } from '../../shared/services/title.service';
import { TwitchService } from '../../shared/services/twitch.service';
import { useFavouriteStore } from '../../shared/stores/favourites.store';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams.model';
import { LiveService } from '../services/live.service';
import FavouriteStreams from '../components/FavouriteStreams.vue';
import ZigZag from '../../shared/components/ZigZag.vue';
import NonFavouriteStreams from '../components/NonFavouriteStreams.vue';

TitleService.setTitle('Live');
const twitchService = new TwitchService();
const favourtieStore = useFavouriteStore();

const _allStreams = ref<TwitchFollowedStreamWithUser[]>();
const _favouriteStreams = ref<TwitchFollowedStreamWithUser[]>();
const _nonFavouriteStreams = ref<TwitchFollowedStreamWithUser[]>();

onMounted(async () => {
    const favouriteIds = favourtieStore.getFavourites();

    _allStreams.value = await twitchService.getFollowedStreamsWithUsers();
    _favouriteStreams.value = LiveService.getFavourites(favouriteIds, _allStreams.value);
    _nonFavouriteStreams.value = LiveService.getNonFavourites(favouriteIds, _allStreams.value);
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
