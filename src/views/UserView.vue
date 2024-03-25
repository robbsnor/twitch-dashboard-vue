<script setup lang="ts">
import UserHeader, { type UserHeaderProps } from '../app/user/components/UserHeader.vue';
import TempTabs from '../app/user/components/TempTabs.vue';
import FilterForm from '../app/user/components/FilterForm.vue';
import { computed, onMounted, ref, watch, type Ref } from 'vue';
import type { Form } from '../app/user/models/form.model';
import type { CardVideoModel } from '../app/user/models/card-video.model';
import { TwitchService } from '../app/shared/services/twitch.service';
import { UserFactory } from '../app/user/factories/card-video.factory';
import CardVideo from '../app/user/components/CardVideo.vue';
import type { VideoTypesModel } from '../app/shared/models/twitch/video-types.model';
import { useRouteParams } from '@vueuse/router';
import type { TwitchUser } from '../app/shared/models/twitch/users.model';

const twitchService = new TwitchService();

const _drawer = ref(false);
const _form = ref<Form>({
    search: '',
    category: '',
    type: 'all',
    showTime: true,
    showThumbnails: true,
})
const _userLogin = useRouteParams('userLogin') as Ref<string>;
const _userNotFound = ref(false);
const _user = ref<TwitchUser>();
const _userHeader = ref<UserHeaderProps>();

const getCards = async (types: VideoTypesModel = 'all') => {
    const res = await twitchService.getVideosByUserId(52385053, types);
    const videos = res.data;
    return videos;
    // return CardVideoFactory.mapFromTwitchVideo(videos);
}

onMounted(async () => {
    getUser()
})

const getUser = async () => {
    const res = await twitchService.getUsers({ logins: [_userLogin.value] });
    const user = res.data[0];
    if (!user) return _userNotFound.value = true;

    _user.value = user;
}

watch(_user, async (newUser) => {
    if (!newUser) return;
    _userHeader.value = {
        username: newUser.display_name,
        avatar: newUser.profile_image_url,
        followers: 222,
        isFavourite: false,
    }
})

watch(_userLogin, async (newUserLogin) => {
    console.log(newUserLogin)
})

watch(_form, async (newForm) => {
    getCards(newForm.type);
}, { deep: true });
</script>

<template>
    <div class="user">
        <UserHeader
            v-if="_userHeader"
            v-bind="_userHeader"
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
                <!-- <CardVideo
                    v-for="card in _cards"
                    :key="card.id"
                    :card="card"
                    :showTime="_form.showTime"
                    :showThumbnail="_form.showThumbnails"
                /> -->
            </div>
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
