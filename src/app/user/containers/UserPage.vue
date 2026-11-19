<script setup lang="ts">
import { useTwitchApi } from '@/app/shared/composables/useTwitchApi.composable';
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import { useRouteParams } from '@vueuse/router';
import { onMounted, ref } from 'vue';
import { TitleService } from '../../shared/services/title.service';
import UserHeader, { type UserHeaderProps } from '../components/UserHeader.vue';
import { UserFactory } from '../factories/user.factory';
import UserCards from './UserCards.vue';

const userLogin = useRouteParams<string>('userLogin');
const twitchApi = useTwitchApi();
const userHeader = ref<UserHeaderProps>();
const user = ref<TwitchUser>();
const loading = ref(true);

onMounted(async () => {
    loading.value = true;

    try {
        const users = await twitchApi.getUsers({ logins: [userLogin.value] });

        user.value = users.find((user) => user.login.toLocaleLowerCase() === userLogin.value.toLocaleLowerCase());
        if (!user.value) return;

        TitleService.setTitle(user.value.display_name);
        userHeader.value = UserFactory.mapToUserHeader(user.value);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="user">
        <template v-if="!loading">
            <template v-if="user && userHeader">
                <UserHeader v-if="userHeader" v-bind="userHeader" class="user__header" />
                <UserCards v-if="user" :user="user" class="user__cards" />
            </template>

            <Empty v-else title="Oopsie," icon="mdi-close" description="User not found..."> </Empty>
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
