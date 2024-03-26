<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';
import { ref, watch } from 'vue';
import Button from '../../shared/components/Button.vue';
import Spinner from '../../shared/components/Spinner.vue';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import { TwitchService } from '../../shared/services/twitch.service';
import CardVideo from '../components/CardVideo.vue';
import FilterForm from '../components/FilterForm.vue';
import { UserFactory } from '../factories/card-video.factory';
import type { CardVideo as CardVideoModel } from '../models/card-video.model';
import type { Form } from '../models/form.model';
import _ from 'lodash';

const props = defineProps<{
    user?: TwitchUser;
}>()

const { y } = useWindowScroll();
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

const _ui = ref({
    _cards: ref<CardVideoModel[]>([]),
    _loadingCards: ref(true),
})

const getNewCards = async () => {
    _ui.value._loadingCards = true;
    const res = await twitchService.getVideosByUserId(Number(props.user?.id), 'all', _pagination.value);
    const videos = res.data;
    _pagination.value = res.pagination.cursor;
    const newCards = UserFactory.mapToCards(videos);

    _ui.value._cards = [..._ui.value._cards, ...newCards];
    _ui.value._loadingCards = false;
}

watch(() => props.user, () => {
    _ui.value._cards = [];
    _pagination.value = '';
    getNewCards();
})
</script>

<template>
    <div class="user-cards">
        <div class="user-cards__filter">
            <el-input
                v-model="_form.search"
                size="large"
                placeholder="Search videos..."
                clearable
            ></el-input>
            <vue-feather
                @click="_drawer = true"
                type="sliders"
                class="user-cards__filter-icon"
            ></vue-feather>
        </div>

        <div class="user-cards__cards">
            <CardVideo
                v-for="card in _ui._cards"
                :key="card.id"
                :card="card"
                :showTime="_form.showTime"
                :showThumbnail="_form.showThumbnails"
            />
        </div>

        <div class="user-cards__footer">
            <Spinner v-if="_ui._loadingCards"/>
            <Button v-else @click="getNewCards">Load more</Button>
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

.user-cards {
    $self: &;

    &__filter {
        display: flex;
        align-items: center;
        gap: rem($padding);
        padding-bottom: rem($padding);
    }

    &__filter-icon {
        cursor: pointer;
    }

    &__cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: rem($padding * 2) rem($padding);
    }

    &__footer {
        min-height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    // @include screen(800px) {
    //
    // }
}
</style>
