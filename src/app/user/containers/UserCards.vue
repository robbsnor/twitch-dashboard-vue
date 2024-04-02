<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import { TwitchService } from '../../shared/services/twitch.service';
import CardVideo from '../components/CardVideo.vue';
import FilterForm from '../components/FilterForm.vue';
import { UserFactory } from '../factories/user.factory';
import type { CardVideo as CardVideoModel } from '../models/card-video.model';
import type { Form } from '../models/form.model';
import { LEKKER_SPELEN_VIDEOS } from '../data/lekkerspelen-videos.data';
import _ from 'lodash';

const props = defineProps<{
    user: TwitchUser;
}>()

const twitchService = new TwitchService();

const _additionalVideoInfo = ref(LEKKER_SPELEN_VIDEOS);
const _drawer = ref(false);
const _form = ref<Form>({
    search: null,
    type: 'all',
    showDuration: true,
    showThumbnail: true,
})
const _pagination = ref('');
const _cards = ref<CardVideoModel[]>([]);
const _loadingCards = ref(true);

const _categories = computed(() => {
    const duplicateCategories = _additionalVideoInfo.value.map((video) => video.chapters.map(chapter => chapter.title)).flat();
    const orderedCategories = [...new Set(duplicateCategories)].filter(category => category !== "").sort();
    return orderedCategories;
})

const getCards = async (amount = 20, pagination?: string) => {
    _loadingCards.value = true;

    const res = await twitchService.getVideosByUserId(Number(props.user.id), 'all', pagination, amount);
    _pagination.value = res.pagination.cursor;

    const videos = res.data;
    const newCards = UserFactory.mapToCards(videos);
    _cards.value = [..._cards.value, ...newCards];

    _loadingCards.value = false;
}

const loadMore = () => getCards(100, _pagination.value);

const update = () => {
    _cards.value = [];
    _pagination.value = '';
    getCards();
}

const searchVideos = async (query: string) => {
    _loadingCards.value = true;
    _cards.value = [];

    if (!query) return getCards();

    const videoIds = _additionalVideoInfo.value.filter((video) => {
        const matchedTitle = video.title.toLowerCase().includes(query.toLocaleLowerCase());
        const matchedChapters = video.chapters.some(chapter => chapter.title.toLowerCase().includes(query.toLocaleLowerCase()));
        return matchedTitle || matchedChapters;
    }).map(video => video.videoId);

    const res = await twitchService.getVideosByVideoIds(videoIds);
    _cards.value = UserFactory.mapToCards(res.data);
    _pagination.value = '';
    _loadingCards.value = false;
}

watch(
    () => _form.value.search,
    _.debounce( async(query) => {
        searchVideos(query);
    }, 500)
)

watch(() => props.user, () => {
    update();
})

onMounted(() => {
    update();
})
</script>

<template>
    <div class="user-cards">
        <Section modifier="user-cards" class="user-cards__section">
            <template #actions>
                <div class="filter">
                    <v-combobox
                        v-model="_form.search"
                        appendIcon="mdi-filter-variant"
                        @click:append="_drawer = true"
                        :items="_categories"
                        placeholder="Search video..."
                        class="filter__search"
                    />
                </div>
            </template>

            <template #default>
                <div class="cards">
                    <CardVideo
                        v-for="card in _cards"
                        :key="card.id"
                        :card="card"
                        :showDuration="_form.showDuration"
                        :showThumbnail="_form.showThumbnail"
                        class="cards__card"
                    />
                </div>
            </template>
        </Section>

        <div class="user-cards__footer">
            <Spinner v-if="_loadingCards"/>
            <Button v-if="!_loadingCards && _pagination" @click="loadMore()">Load more</Button>
        </div>


        <!-- drawer -->
        <v-bottom-sheet v-model="_drawer">
            <FilterForm :form="_form" />
        </v-bottom-sheet>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

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
    gap: rem(8px);
    width: 100%;
    min-width: rem(336px);
    padding-bottom: rem($padding);
}

.cards {
    display: grid;
    gap: rem(50px) rem(30px);

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
