<script setup lang="ts">
import { useAppOptionsStore } from '@/app/base/stores/AppOptions.store';
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import CardVideo from '../components/CardVideo.vue';
import { LEKKER_SPELEN_VIDEOS } from '../data/lekkerspelen-videos.data';
import { UserFactory } from '../factories/user.factory';
import type { CardVideo as CardVideoModel } from '../models/card-video.model';
import { useTwitchApi } from '@/app/shared/composables/useTwitchApi.composable';

const props = defineProps<{
    user: TwitchUser;
}>();

const appOptionsStore = useAppOptionsStore();
const twitchApi = useTwitchApi();
const { options } = storeToRefs(appOptionsStore);

const additionalVideosInfo = ref(LEKKER_SPELEN_VIDEOS);
const search = ref<string>();
const cards = ref<CardVideoModel[]>([]);
const loadingCards = ref(true);

const _categories = computed(() => {
    const duplicateCategories = additionalVideosInfo.value
        .map((video) => video.chapters.map((chapter) => chapter.title))
        .flat();
    const orderedCategories = [...new Set(duplicateCategories)].filter((category) => category !== '').sort();
    return orderedCategories;
});

async function getCards() {
    loadingCards.value = true;

    const videos = await twitchApi.getVideos({ userIds: [props.user.id] });
    const newCards = UserFactory.mapToCards(videos, additionalVideosInfo.value);
    cards.value = [...cards.value, ...newCards];

    loadingCards.value = false;
}

const init = () => {
    cards.value = [];
    getCards();
};

watch(
    () => props.user,
    () => init()
);

onMounted(() => {
    init();
});
</script>

<template>
    <div>
        <Section first title="Video's">
            <template #default>
                <div
                    class="grid gap-x-6 gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 l xl:grid-cols-4 2xl:grid-cols-5"
                    v-fade-stagger
                >
                    <CardVideo
                        v-for="card in cards"
                        :key="card.id"
                        :card="card"
                        :showDuration="options.user.showDuration"
                        :showThumbnail="options.user.showThumbnail"
                        :showCategories="options.user.showCategories"
                        @click:chapter="search = $event.title"
                    />
                </div>
            </template>
        </Section>

        <div class="flex min-h-[100px] items-center justify-center">
            <Spinner v-if="loadingCards" />
        </div>
    </div>
</template>
