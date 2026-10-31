<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { ref, watch } from 'vue';
import { TitleService } from '../../shared/services/title.service';
import UserHeader, { type UserHeaderProps } from '../components/UserHeader.vue';
import { UserFactory } from '../factories/user.factory';
import UserCards from './UserCards.vue';
import { useTwitchApi } from '@/app/shared/composables/useTwitchApi.composable';

const userLogin = useRouteParams<string>('userLogin');
const twitchApi = useTwitchApi();
const userHeader = ref<UserHeaderProps>();
const user = computedAsync(async () => {
    const users = await twitchApi.getUsers({ logins: [userLogin.value] });

    return users.find((user) => user.login.toLocaleLowerCase() === userLogin.value.toLocaleLowerCase());
});

watch(user, () => {
    if (!user.value) return;

    TitleService.setTitle(user.value.display_name);
    userHeader.value = UserFactory.mapToUserHeader(user.value);
});
</script>

<template>
    <div class="user">
        <template v-if="user && userHeader">
            <UserHeader v-if="userHeader" v-bind="userHeader" class="user__header" />

            <UserCards :user="user" class="user__cards" />
        </template>

        <Spinner v-else padding />
    </div>
</template>

<style scoped lang="scss">
.user {
    &__header {
        margin-top: -$header-height;
        margin-bottom: rem($padding);
    }
}
</style>
