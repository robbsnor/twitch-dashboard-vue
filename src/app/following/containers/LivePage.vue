<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { TitleService } from "../../shared/services/title.service";
import FavouriteStreams from "../components/FavouriteStreams.vue";
import NonFavouriteStreams from "../components/NonFavouriteStreams.vue";
import { useFollowingStore } from "../stores/following.store";
import Schedule from "../components/Schedule.vue";
import { useWindowFocus } from "@vueuse/core";
import { useToast } from "vue-toast-notification";
import type { TwitchSchedule } from "@/app/shared/models/twitch/schedule.model";
import type { TwitchUser } from "../../shared/models/twitch/users.model";
import { TwitchApiService } from "../../shared/services/twitch-api.service";
import { useFavouriteStore } from "../../shared/stores/favourites.store";
import { LiveService } from "../services/live.service";
import type { TwitchFollowedStreamWithUser } from "@/app/shared/models/twitch/followed-streams-with-user.model";

TitleService.setTitle("Live");
const followingStore = useFollowingStore();
const favourtieStore = useFavouriteStore();
const twitchApiService = new TwitchApiService();

const { filter, streamsLastFetchedOn } = storeToRefs(followingStore);
const favouriteStreams = ref<TwitchFollowedStreamWithUser[]>();
const nonFavouriteStreams = ref<TwitchFollowedStreamWithUser[]>();
const focused = useWindowFocus()
const loading = ref(false);

const scheduleUsers = ref<TwitchUser[]>();
const schedules = ref<TwitchSchedule[]>();

onMounted(async () => {
    fetchStreams();
    fetchSchedules();
});

const fetchStreams = async () => {
    streamsLastFetchedOn.value = new Date().getTime();
    const streams = await twitchApiService.getFollowedStreamsWithUser();

    favouriteStreams.value = LiveService.getFavourites(
        favourtieStore.favouriteStreamerIds,
        streams
    );

    nonFavouriteStreams.value = LiveService.getNonFavourites(
        favourtieStore.favouriteStreamerIds,
        streams
    );
};

const fetchSchedules = async () => {
    scheduleUsers.value = (await twitchApiService.getUsers({ids: favourtieStore.favouriteStreamerIds})).data;
    schedules.value = (await twitchApiService.getSchedules(favourtieStore.favouriteStreamerIds, 14));
};

const refetch = async () => {
    if (!streamsLastFetchedOn.value) return;

    const isLongerThan30SecAgo = new Date().getTime() - streamsLastFetchedOn.value > 1000 * 30;
    if (!isLongerThan30SecAgo) return;

    fetchStreams();
}

watch(focused, (isFocused) => {
    if (!isFocused) return;
    refetch();
});

const cssClass = computed(() => {
    return {
        'stream-wrapper': true,
        'stream-wrapper--fade-out': loading.value,
    };
});

</script>

<template>
    <template v-if="favouriteStreams && nonFavouriteStreams">
        <div :class="cssClass">
            <FavouriteStreams :streams="favouriteStreams" />

            <Section hideHeader>
                <ZigZag />
            </Section>

            <NonFavouriteStreams
                v-model:filter="filter"
                :streams="nonFavouriteStreams"
            />

            <Section>
                <ZigZag></ZigZag>
            </Section>
        </div>

        <template v-if="schedules && scheduleUsers">
            <Schedule :schedules="schedules" :users="scheduleUsers" />

            <Section>
                <ZigZag></ZigZag>
            </Section>
        </template>

        <Section>
            <div class="button-wrapper">
                <a href="https://www.twitch.tv/directory/following/videos" target="_blank">
                    <Button color="secondary" icon="twitch">Continue Watching</Button>
                </a>
            </div>
        </Section>
    </template>

    <Spinner v-else padding />
</template>

<style scoped lang="scss">
.button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: rem(20px);
}

.stream-wrapper {
    transition: .2s;

    &--fade-out {
        filter: blur(3px);
        transform: translateY(5px);
        opacity: .3;
        transition: none;
    }
}
</style>
