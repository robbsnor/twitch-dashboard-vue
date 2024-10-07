<script setup lang="ts">
import { TwitchApiService } from "@/app/shared/services/twitch-api.service";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams-with-user.model";
import { TitleService } from "../../shared/services/title.service";
import { useFavouriteStore } from "../../shared/stores/favourites.store";
import FavouriteStreams from "../components/FavouriteStreams.vue";
import NonFavouriteStreams from "../components/NonFavouriteStreams.vue";
import { LiveService } from "../services/live.service";
import { useFollowingStore } from "../stores/following.store";
import { useDocumentVisibility } from '@vueuse/core'
import type { TwitchStreamSchedule } from "@/app/shared/models/twitch/schedule.model";

TitleService.setTitle("Live");
const favourtieStore = useFavouriteStore();
const followingStore = useFollowingStore();
const twitchApiService = new TwitchApiService();

const { filter } = storeToRefs(followingStore);
const visibility = useDocumentVisibility()

const favouriteIds = ref<number[]>(favourtieStore.favouriteStreamerIds);
const allStreams = ref<TwitchFollowedStreamWithUser[]>();
const favouriteStreams = ref<TwitchFollowedStreamWithUser[]>();
const nonFavouriteStreams = ref<TwitchFollowedStreamWithUser[]>();
const lastFetchedOn = ref<Date>();
const schedules = ref<TwitchStreamSchedule[]>();

onMounted(async () => {
    fetchStreams();
    fetchSchedule();
});

const fetchStreams = async () => {
    console.log(`Fetching streams..: ${new Date()}`);

    lastFetchedOn.value = new Date();

    allStreams.value = await twitchApiService.getFollowedStreamsWithUsers();
    favouriteStreams.value = LiveService.getFavourites(
        favouriteIds.value,
        allStreams.value
    );
    nonFavouriteStreams.value = LiveService.getNonFavourites(
        favouriteIds.value,
        allStreams.value
    );
};

const fetchSchedule = async () => {
    console.log(`Fetching schedule..: ${new Date()}`);
    schedules.value  = await twitchApiService.getStreamSchedule(favourtieStore.favouriteStreamerIds);
};

const nextStreams = computed(() => {
    if (!schedules.value) return;

    return schedules.value.map(schedule => {
        const segments = schedule.segments;
        if (!segments) return;

        const firtStream = segments[0];
        if (!firtStream) return;

        return {
            name: schedule.broadcaster_name,
            nextStream: {
                title: firtStream.title || '-',
                start: firtStream.start_time,
            },
        }
    }).filter(Boolean);
})

const refetchStreams = async () => {
    const hasBeenOneMinute =
        lastFetchedOn.value &&
        new Date().getTime() - lastFetchedOn.value.getTime() > 60000;
    if (!hasBeenOneMinute) return;

    allStreams.value = undefined;
    fetchStreams();
};

watch(visibility, (value) => {
    if (value === 'visible') {
        // refetchStreams();
    }
})
</script>

<template>
    <template v-if="allStreams">
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

        <Section title="Schedule">
            <div class="schedule">
                <code>
                    <pre>
                        {{ nextStreams }}
                    </pre>
                </code>
            </div>
        </Section>

        <Section>
            <ZigZag></ZigZag>
        </Section>

        <Section>
            <div class="previous-streams">
                <a href="https://www.twitch.tv/directory/following/videos" target="_blank">
                    <Button color="secondary">Previous streams</Button>
                </a>
            </div>
        </Section>
    </template>

    <Spinner v-else padding />
</template>

<style scoped lang="scss">
.previous-streams {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: rem(20px);
}
</style>
