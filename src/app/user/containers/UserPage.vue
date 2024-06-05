<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { ref, watch } from 'vue';
import { TitleService } from '../../shared/services/title.service';
import { TwitchService } from '../../shared/services/twitch.service';
import UserHeader, { type UserHeaderProps } from '../components/UserHeader.vue';
import { UserFactory } from '../factories/user.factory';
import UserCards from './UserCards.vue';

const twitchService = new TwitchService();

const userLogin = useRouteParams<string>('userLogin');
const userHeader = ref<UserHeaderProps>();
const user = computedAsync(async () => {
    const res = await twitchService.getUsers({ logins: [userLogin.value] });
    return res.data[0];
});

watch(user, async () => {
    TitleService.setTitle(user.value.display_name);

    const resFollowers = await twitchService.getChannelFollowers(Number(user.value.id));
    userHeader.value = UserFactory.mapToUserHeader(user.value, resFollowers.total);
});
</script>

<template>
    <div class="user">
        <template v-if="user && userHeader">
            <UserHeader
                v-if="userHeader"
                v-bind="userHeader"
                class="user__header"
            />

            <UserCards :user="user" class="user__cards" />
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
