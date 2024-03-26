<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Button from '../../shared/components/Button.vue';
import Spinner from '../../shared/components/Spinner.vue';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import { TwitchService } from '../../shared/services/twitch.service';
import CardVideo from '../components/CardVideo.vue';
import FilterForm from '../components/FilterForm.vue';
import { UserFactory } from '../factories/card-video.factory';
import type { CardVideo as CardVideoModel } from '../models/card-video.model';
import type { Form } from '../models/form.model';
import Section from '../../shared/components/Section.vue';

const props = defineProps<{
    user: TwitchUser;
}>()

const twitchService = new TwitchService();

const _drawer = ref(false);
const _form = ref<Form>({
    search: '',
    category: '',
    type: 'all',
    showTime: true,
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
        <Section modifier="user-cards">
            <template #actions>
                <div class="filter">
                    <el-input
                        v-model="_form.search"
                        size="large"
                        placeholder="Search videos..."
                        clearable
                        class="filter__input"
                    ></el-input>

                    <vue-feather
                        @click="_drawer = true"
                        type="sliders"
                        class="filter__icon"
                    ></vue-feather>
                </div>
            </template>

            <div class="cards">
                <CardVideo
                    v-for="card in _cards"
                    :key="card.id"
                    :card="card"
                    :showTime="_form.showTime"
                    :showThumbnail="_form.showThumbnails"
                />
            </div>
        </Section>

        <div class="footer">
            <Spinner v-if="_loadingCards"/>
            <Button v-else @click="getNewCards(100)">Load more</Button>
        </div>
    </div>

    <!-- drawer -->
    <el-drawer v-model="_drawer" size="auto" direction="btt" title="Filter videos">
        <template #default>
            <FilterForm :form="_form" />
        </template>
    </el-drawer>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.filter {
    display: flex;
    align-items: center;
    gap: rem($padding);
    padding-bottom: rem($padding);
    width: 100%;

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

.footer {
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
