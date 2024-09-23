<script setup lang="ts">
import { useAppOptionsStore } from '@/app/base/stores/AppOptions.store';
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import { TwitchApiService } from '../../shared/services/twitch-api.service';
import CardVideo from '../components/CardVideo.vue';
import { LEKKER_SPELEN_VIDEOS } from '../data/lekkerspelen-videos.data';
import { UserFactory } from '../factories/user.factory';
import type { CardVideo as CardVideoModel } from '../models/card-video.model';

const props = defineProps<{
    user: TwitchUser;
}>();

const twitchApiService = new TwitchApiService();

const appOptionsStore = useAppOptionsStore();
const { options } = storeToRefs(appOptionsStore);

const additionalVideosInfo = ref(LEKKER_SPELEN_VIDEOS);
const search = ref<string>();
const pagination = ref('');
const cards = ref<CardVideoModel[]>([]);
const loadingCards = ref(true);

const _categories = computed(() => {
    const duplicateCategories = additionalVideosInfo.value.map((video) => video.chapters.map(chapter => chapter.title)).flat();
    const orderedCategories = [...new Set(duplicateCategories)].filter(category => category !== "").sort();
    return orderedCategories;
});

const getCards = async (amount = 20, _pagination?: string) => {
    loadingCards.value = true;

    const res = await twitchApiService.getVideosByUserId(Number(props.user.id), 'all', _pagination, amount);
    pagination.value = res.pagination.cursor;

    const videos = res.data;
    const newCards = UserFactory.mapToCards(videos, additionalVideosInfo.value);
    cards.value = [...cards.value, ...newCards];

    loadingCards.value = false;
};

const loadMore = () => getCards(100, pagination.value);

const init = () => {
    cards.value = [];
    pagination.value = '';
    getCards();
};

const searchVideos = async (query: string | null) => {
    loadingCards.value = true;
    cards.value = [];

    if (!query) return getCards();

    const videoIds = additionalVideosInfo.value.filter((video) => {
        const matchedTitle = video.title.toLowerCase().includes(query.toLocaleLowerCase());
        const matchedChapters = video.chapters.some(chapter => chapter.title.toLowerCase().includes(query.toLocaleLowerCase()));
        return matchedTitle || matchedChapters;
    }).map(video => video.videoId);

    const res = await twitchApiService.getVideosByVideoIds(videoIds);
    cards.value = UserFactory.mapToCards(res.data, additionalVideosInfo.value);
    pagination.value = '';
    loadingCards.value = false;
};

watch(
    () => search.value,
    _.debounce(async (query) => {
        searchVideos(query);
    }, 500)
);

watch(() => props.user, () => {
    init();
});

onMounted(() => {
    init();
});
</script>

<template>
    <div class="user-cards">
        <Section first class="user-cards__section">
            <template #actions>
                <div class="filter">
                    <v-combobox
                        class="filter__search"
                        v-model="search"
                        :items="_categories"
                        placeholder="Search videos..."
                    />
                </div>
            </template>

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
            <Spinner v-if="loadingCards"/>
            <Button v-if="!loadingCards && pagination" @click="loadMore()">Load more</Button>
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
