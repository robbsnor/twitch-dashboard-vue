<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { ref, type Ref } from 'vue';
import { TwitchService } from '../../shared/services/twitch.service';
import UserHeader, { type UserHeaderProps } from '../components/UserHeader.vue';
import { UserFactory } from '../factories/user.factory';
import UserCards from './UserCards.vue';
import { TitleService } from '../../shared/services/title.service';
import { watch } from 'vue';

const twitchService = new TwitchService();

const _userLogin = useRouteParams('userLogin') as Ref<string>;
const _userHeader = ref<UserHeaderProps>();
const _user = computedAsync(async () => {
    const res = await twitchService.getUsers({ logins: [_userLogin.value] });
    const user = res.data[0];
    return user;
})

watch(_user, async () => {
    TitleService.setTitle(_user.value.display_name);

    const resFollowers = await twitchService.getChannelFollowers(Number(_user.value.id));
    _userHeader.value = UserFactory.mapToUserHeader(_user.value, resFollowers.total);
});
</script>

<template>
    <div class="user">
        <template v-if="_user && _userHeader">
            <UserHeader
                v-if="_userHeader"
                v-bind="_userHeader"
                class="user__header"
            />

            <UserCards :user="_user" class="user__cards" />
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
        margin-bottom: rem($padding);
    }
}
</style>
