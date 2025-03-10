<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { TitleService } from "../../shared/services/title.service";
import FavouriteStreams from "../components/FavouriteStreams.vue";
import NonFavouriteStreams from "../components/NonFavouriteStreams.vue";
import { type ScheduleModel } from "../services/live.service";
import { useFollowingStore } from "../stores/following.store";
import Schedule from "../components/Schedule.vue";
import { FollowingFacade, type Streams } from "../facade/following.facade";
import { useWindowFocus } from "@vueuse/core";
import { useToast } from "vue-toast-notification";
import type { TwitchSchedule } from "@/app/shared/models/twitch/schedule.model";
import type { TwitchScheduleWithUser } from "@/app/shared/models/twitch/schedule-with-user.model";
import { TwitchUser } from "../../shared/models/twitch/users.model";
import { TwitchApiService } from "../../shared/services/twitch-api.service";
import { useFavouriteStore } from "../../shared/stores/favourites.store";

TitleService.setTitle("Live");
const followingStore = useFollowingStore();
const favourtieStore = useFavouriteStore();
const toast = useToast();
const twitchApiService = new TwitchApiService();

const { filter, streamsLastFetchedOn } = storeToRefs(followingStore);
const streams = ref<Streams>();
const focused = useWindowFocus()
const loading = ref(false);

const scheduleUsers = ref<TwitchUser[]>();
const schedules = ref<TwitchSchedule[]>();

onMounted(async () => {
    streamsLastFetchedOn.value = new Date().getTime();
    streams.value = await FollowingFacade.getStreams();


    scheduleUsers.value = (await twitchApiService.getUsers({ids: favourtieStore.favouriteStreamerIds})).data;
    schedules.value = (await twitchApiService.getSchedule(favourtieStore.favouriteStreamerIds));

    // schedules.value = await FollowingFacade.getSchedules();
});

const refetch = async () => {
    if (!streamsLastFetchedOn.value) return;

    const isLongerThan30SecAgo = new Date().getTime() - streamsLastFetchedOn.value > 1000 * 30;
    if (!isLongerThan30SecAgo) return;

    const newStreams = await FollowingFacade.getStreams();

    streams.value = newStreams;
    streamsLastFetchedOn.value = new Date().getTime();

    notifyNewStreams();
}

const notifyNewStreams = async () => {
    const newStreams = await FollowingFacade.getStreams();
    const oldUsers = streams.value?.favouriteStreams.map((stream) => stream.display_name);
    const newUsers = newStreams.favouriteStreams.map((stream) => stream.display_name);
    const newUsersOnline = newUsers.filter((user) => !oldUsers!.includes(user));
    console.log('newUsersOnline: ', newUsersOnline);

    newUsersOnline.forEach((user, index) => {
        setTimeout(() => toast.success(`${user} is now live!`), index * 100);
    });
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
    <div v-if="streams" :class="cssClass">
        <FavouriteStreams :streams="streams.favouriteStreams" />

        <Section hideHeader>
            <ZigZag />
        </Section>

        <NonFavouriteStreams
            v-model:filter="filter"
            :streams="streams.nonFavouriteStreams"
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

    <Section v-if="streams">
        <div class="button-wrapper">
            <a href="https://www.twitch.tv/directory/following/videos" target="_blank">
                <Button color="secondary" icon="twitch">Continue Watching</Button>
            </a>
        </div>
    </Section>

    <Spinner v-if="!streams" padding />
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
