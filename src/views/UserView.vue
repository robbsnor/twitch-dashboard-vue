<script setup lang="ts">
import UserHeader, { type UserHeaderProps } from '../app/user/components/UserHeader.vue';
import TempTabs from '../app/user/components/TempTabs.vue';
import FilterForm from '../app/user/components/FilterForm.vue';
import { computed, onMounted, ref, watch, type Ref, reactive } from 'vue';
import type { Form } from '../app/user/models/form.model';
import type { CardVideo as CardVideoModel } from '../app/user/models/card-video.model';
import { TwitchService } from '../app/shared/services/twitch.service';
import { UserFactory } from '../app/user/factories/card-video.factory';
import CardVideo from '../app/user/components/CardVideo.vue';
import type { VideoTypesModel } from '../app/shared/models/twitch/video-types.model';
import { useRouteParams } from '@vueuse/router';
import type { TwitchUser } from '../app/shared/models/twitch/users.model';
import { computedAsync } from '@vueuse/core'
import { LiveFactory } from '../app/live/factories/live.factory';
import type { CardLive } from '../app/live/models/card-live.model';
import Button from '../app/shared/components/Button.vue';
import Spinner from '../app/shared/components/Spinner.vue';

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
const _userLogin = useRouteParams('userLogin') as Ref<string>;
const _user = computedAsync(async () => {
    const res = await twitchService.getUsers({ logins: [_userLogin.value] });
    const user = res.data[0];

    return user;
})

const _ui = ref({
    _userHeader: computedAsync(async () => UserFactory.mapToUserHeader(_user.value)),
    _cards: ref<CardVideoModel[]>([]),
    _loadingCards: ref(false),
})

watch(_user, async () => {
    getNewCards();
})

const getNewCards = async () => {
    _ui.value._loadingCards = true;
    const res = await twitchService.getVideosByUserId(Number(_user.value.id), 'all', _pagination.value);
    const videos = res.data;
    _pagination.value = res.pagination.cursor;
    const newCards = UserFactory.mapToCards(videos);

    _ui.value._cards = [..._ui.value._cards, ...newCards];
    _ui.value._loadingCards = false;
}

</script>

<template>
    <div class="user">
        <UserHeader
            v-if="_ui._userHeader"
            v-bind="_ui._userHeader"
            class="user__header"
        />

        <div class="user__container">
            <TempTabs />
            <el-input v-model="_form.search" size="large" placeholder="Search videos..." clearable></el-input>
            <vue-feather @click="_drawer = true" type="heart"></vue-feather>

            <code style="min-height: 250px; margin: 20px 0">
                {{ _form }}
            </code>

            <div class="user__cards">
                <CardVideo
                    v-for="card in _ui._cards"
                    :key="card.id"
                    :card="card"
                    :showTime="_form.showTime"
                    :showThumbnail="_form.showThumbnails"
                />
            </div>

            <Spinner v-if="_ui._loadingCards"/>
            <Button v-else @click="getNewCards">Load more</Button>
        </div>
    </div>

    <!-- drawer -->
    <el-drawer v-model="_drawer" size="auto" direction="btt" title="Filter videos">
        <template #default>
            <FilterForm :form="_form"/>
        </template>
    </el-drawer>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.user {
    $self: &;

    &__header {
        margin-top: -$header-height;
    }

    &__container {
        @include container;
    }

    &__search {
        display: flex;
        gap: rem($padding);
    }

    &__cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: rem($padding * 2) rem($padding);
    }

    // @include screen(800px) {
    //
    // }
}


</style>
