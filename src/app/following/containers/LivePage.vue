<script setup lang="ts">
import { TwitchApiService } from "@/app/shared/services/twitch-api.service";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams-with-user.model";
import { TitleService } from "../../shared/services/title.service";
import { useFavouriteStore } from "../../shared/stores/favourites.store";
import FavouriteStreams from "../components/FavouriteStreams.vue";
import NonFavouriteStreams from "../components/NonFavouriteStreams.vue";
import { LiveService, type ScheduleModel } from "../services/live.service";
import { useFollowingStore } from "../stores/following.store";
import Schedule from "../components/Schedule.vue";

TitleService.setTitle("Live");
const favourtieStore = useFavouriteStore();
const followingStore = useFollowingStore();
const twitchApiService = new TwitchApiService();

const { filter } = storeToRefs(followingStore);

const favouriteIds = ref<number[]>(favourtieStore.favouriteStreamerIds);
const allStreams = ref<TwitchFollowedStreamWithUser[]>();
const favouriteStreams = ref<TwitchFollowedStreamWithUser[]>();
const nonFavouriteStreams = ref<TwitchFollowedStreamWithUser[]>();
const lastFetchedOn = ref<Date>();
const schedules = ref<ScheduleModel[]>();

onMounted(() => {
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
    schedules.value = await LiveService.getSchedule();
};
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
    </template>

    <Section v-if="schedules" title="Upcomming streams">
        <div class="schedules">
            <Schedule v-for="schedule in schedules" :key="schedule.id" :schedule="schedule" />
        </div>

        <Section>
            <ZigZag></ZigZag>
        </Section>
    </Section>

    <Section v-if="allStreams">
        <div class="previous-streams">
            <a href="https://www.twitch.tv/directory/following/videos" target="_blank">
                <Button color="secondary">Previous streams</Button>
            </a>
        </div>
    </Section>

    <Spinner v-if="!allStreams" padding />
</template>

<style scoped lang="scss">
.previous-streams {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: rem(20px);
}

.schedules {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 30px;

    @include screen($desktop) {
        grid-template-columns: repeat(2, 1fr);
    }

    @include screen(1400px) {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
