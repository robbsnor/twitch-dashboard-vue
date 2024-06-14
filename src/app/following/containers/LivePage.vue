<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TitleService } from '../../shared/services/title.service';
import { useFavouriteStore } from '../../shared/stores/favourites.store';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams.model';
import { LiveService } from '../services/live.service';
import FavouriteStreams from '../components/FavouriteStreams.vue';
import ZigZag from '../../shared/components/ZigZag.vue';
import NonFavouriteStreams from '../components/NonFavouriteStreams.vue';
import { useLiveStore } from '../stores/live.store';

TitleService.setTitle('Live');
const favourtieStore = useFavouriteStore();
const liveStore = useLiveStore();

const allStreams = ref<TwitchFollowedStreamWithUser[]>();
const favouriteStreams = ref<TwitchFollowedStreamWithUser[]>();
const nonFavouriteStreams = ref<TwitchFollowedStreamWithUser[]>();

onMounted(async () => {
    const favouriteIds = favourtieStore.getFavouriteStreamers();

    allStreams.value = await liveStore.getAllStreams();
    favouriteStreams.value = LiveService.getFavourites(favouriteIds, allStreams.value);
    nonFavouriteStreams.value = LiveService.getNonFavourites(favouriteIds, allStreams.value);
});
</script>

<template>
    <div class="live">
        <template v-if="allStreams">
            <FavouriteStreams :streams="favouriteStreams" />

            <Section hideHeader>
                <ZigZag />
            </Section>

            <NonFavouriteStreams :streams="nonFavouriteStreams" />
        </template>

        <Spinner v-else padding />
    </div>
</template>

<style scoped lang="scss">
.live {}
</style>
