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
import { PromiseService } from "@/app/shared/services/promise.service";

TitleService.setTitle("Live");
const followingStore = useFollowingStore();
const toast = useToast();

const { filter, streamsLastFetchedOn } = storeToRefs(followingStore);
const streams = ref<Streams>();
const schedules = ref<ScheduleModel[]>();
const focused = useWindowFocus()
const loading = ref(false);

onMounted(async () => {
    streams.value = await FollowingFacade.getStreams();
    schedules.value = await FollowingFacade.getSchedules();
    streamsLastFetchedOn.value = new Date().getTime();
});

watch(focused, async (isFocused) => {
    if (!isFocused) return;
    if (!streamsLastFetchedOn.value) return;

    const isLongerThan30SecAgo = new Date().getTime() - streamsLastFetchedOn.value > 1000 * 30;
    // if (!isLongerThan30SecAgo) return;

    loading.value = true;

    streams.value = await FollowingFacade.getStreams();
    streamsLastFetchedOn.value = new Date().getTime();

    loading.value = false;
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

    <template v-if="schedules">
        <Section title="Upcomming streams">
            <div v-fade-stagger class="schedules">
                <Schedule
                    v-for="schedule in schedules"
                    :key="schedule.id"
                    :schedule="schedule"
                />
            </div>
        </Section>

        <Section>
            <ZigZag></ZigZag>
        </Section>
    </template>

    <Section v-if="streams">
        <div class="previous-streams">
            <a href="https://www.twitch.tv/directory/following/videos" target="_blank">
                <Button color="secondary">Previous streams</Button>
            </a>
        </div>
    </Section>

    <Spinner v-if="!streams" padding />
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

    @include screen(800px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @include screen(1400px) {
        grid-template-columns: repeat(3, 1fr);
    }
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
