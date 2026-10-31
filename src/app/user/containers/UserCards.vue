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
    () => {
        init();
    }
);

onMounted(() => {
    init();
});
</script>

<template>
    <div class="user-cards">
        <Section first class="user-cards__section" title="Video's">
            <template #default>
                <div class="cards" v-fade-stagger>
                    <CardVideo
                        class="cards__card"
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

        <div class="user-cards__footer">
            <Spinner v-if="loadingCards" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.user-cards {
    &__footer {
        min-height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.filter {
    display: flex;
    align-items: center;
    width: 100%;
    min-width: rem(336px);
}

.cards {
    display: grid;
    gap: rem(50px) rem($padding-larger);

    @include screen($desktop) {
        grid-template-columns: repeat(3, 1fr);
    }

    @include screen(1200px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @include screen(1500px) {
        grid-template-columns: repeat(5, 1fr);
    }
}
</style>
