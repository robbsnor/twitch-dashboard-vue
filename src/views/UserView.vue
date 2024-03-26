<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { type Ref } from 'vue';
import { TwitchService } from '../app/shared/services/twitch.service';
import TempTabs from '../app/user/components/TempTabs.vue';
import UserHeader from '../app/user/components/UserHeader.vue';
import UserCards from '../app/user/containers/UserCards.vue';
import { UserFactory } from '../app/user/factories/card-video.factory';
import Spinner from '../app/shared/components/Spinner.vue';

const twitchService = new TwitchService();

const _userLogin = useRouteParams('userLogin') as Ref<string>;
const _user = computedAsync(async () => {
    const res = await twitchService.getUsers({ logins: [_userLogin.value] });
    const user = res.data[0];
    return user;
})

const _userHeader = computedAsync(async () => UserFactory.mapToUserHeader(_user.value));
</script>

<template>
    <div class="user">
        <template v-if="_user">
            <UserHeader
                v-if="_userHeader"
                v-bind="_userHeader"
                class="user__header"
            />

            <div class="user__container">
                <TempTabs />
            </div>

            <UserCards :user="_user" />
        </template>

        <Spinner v-else padding/>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.user {
    &__header {
        margin-top: -$header-height;
    }

    &__container {
        @include container;
    }
}
</style>
