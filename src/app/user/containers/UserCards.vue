<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import { TwitchService } from '../../shared/services/twitch.service';
import CardVideo from '../components/CardVideo.vue';
import FilterForm from '../components/FilterForm.vue';
import { UserFactory } from '../factories/card-video.factory';
import type { CardVideo as CardVideoModel } from '../models/card-video.model';
import type { Form } from '../models/form.model';
import { LEKKER_SPELEN_VIDEOS } from '../data/lekkerspelen-videos.data';

const props = defineProps<{
    user: TwitchUser;
}>()

const twitchService = new TwitchService();

const _additionalVideoInfo = ref(LEKKER_SPELEN_VIDEOS);
const _drawer = ref(false);
const _form = ref<Form>({
    search: '',
    type: 'all',
    showDuration: true,
    showThumbnails: true,
})
const _pagination = ref('');
const _cards = ref<CardVideoModel[]>([]);
const _loadingCards = ref(true);

const getNewCards = async (amount = 20) => {
    _loadingCards.value = true;

    const res = await twitchService.getVideosByUserId(Number(props.user.id), 'all', _pagination.value, amount);
    _pagination.value = res.pagination.cursor;

    const videos = res.data;
    const newCards = UserFactory.mapToCards(videos);
    _cards.value = [..._cards.value, ...newCards];

    _loadingCards.value = false;
}

const _categories = computed(() => {
    const duplicateCategories = _additionalVideoInfo.value.map((video) => video.chapters.map(chapter => chapter.title)).flat();
    const orderedCategories = [...new Set(duplicateCategories)].filter(category => category !== "").sort();
    return orderedCategories;
})

const update = () => {
    _cards.value = [];
    _pagination.value = '';
    getNewCards();
}

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
                    <v-combobox v-model="_form.search" :items="_categories" placeholder="Search video..." />

                    <vue-feather
                        @click="_drawer = true"
                        type="sliders"
                        class="filter__icon"
                    ></vue-feather>
                </div>
            </template>

            <template #default>
                <div class="cards">
                    <CardVideo
                        v-for="card in _cards"
                        :key="card.id"
                        :card="card"
                        :showDuration="_form.showDuration"
                        :showThumbnail="_form.showThumbnails"
                        class="cards__card"
                    />
                </div>
            </template>
        </Section>

        <div class="user-cards__footer">
            <Spinner v-if="_loadingCards"/>
            <Button v-else @click="getNewCards(100)">Load more</Button>
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
    gap: rem($padding);
    padding-bottom: rem($padding);

    &__input {
        width: 100%;
    }

    &__icon {
        cursor: pointer;
    }
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: rem($padding * 2) rem($padding);
}
</style>
