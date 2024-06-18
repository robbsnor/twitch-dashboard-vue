<script setup lang="ts">
import { ref } from 'vue';
import HeaderAvatar from './HeaderAvatar.vue';
import Hamburger from '@/app/base/components/Hamburger.vue';
import AppOptionsDialog from '@/app/base/containers/AppOptionsDialog.vue';

const emits = defineEmits(['click-hamburger', 'click-logo']);

const props = defineProps<{
    user?: any;
    menuOpen: boolean;
}>();

const settingsDialog = ref(false);
const userMenuItems = ref([
    {
        title: 'account',
        url: '',
        icon: 'mdi-account',
    },
    {
        title: 'settings',
        url: '',
        icon: 'mdi-cog',
        action: 'toggleSettingsDialog'
    },
    {
        title: 'logout',
        url: '/auth/sign-out',
        icon: 'mdi-logout',
    },
]);

const doAction = (action?: string) => {
    if (action === 'toggleSettingsDialog') {
        settingsDialog.value = !settingsDialog.value;
    }
};
</script>

<template>
    <header class="header">
        <div class="header__container">
            <div class="header__left">
                <div class="header__hamburger">
                    <Hamburger :menuOpen="props.menuOpen" @click="emits('click-hamburger')"/>
                </div>
            </div>

            <RouterLink to="/following/live" @click="emits('click-logo')" class="header__logo">
                <div class="header-logo header-logo--desktop"><Logo :payoff="true" /></div>
                <div class="header-logo header-logo--mobile"><Logo :payoff="false" /></div>
            </RouterLink>

            <div class="header__right">
                <button class="header__user">
                    <span class="sr-only">Username</span>

                    <HeaderAvatar
                        v-if="props.user"
                        :image="props.user.profile_image_url"
                    />

                    <v-menu location="bottom end" activator="parent">
                        <v-list>
                            <v-list-item
                                v-for="(item, index) in userMenuItems"
                                :key="index"
                                :value="index"
                                :to="item.url"
                                :prepend-icon="item.icon"
                                @click="doAction(item.action)"
                            >
                                {{ item.title }}
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </button>
            </div>
        </div>

        <AppOptionsDialog v-model:dialog="settingsDialog" />
    </header>
</template>

<style scoped lang="scss">
.header {
    height: $header-height;
    background-image: linear-gradient(180deg, $c-black-1 0%, rgba($c-black-1, 0) 100%);

    &__container {
        @include container();

        display: grid;
        align-items: center;
        grid-template-columns: 1fr auto 1fr;
        height: 100%;
    }

    &__left {
        display: flex;
        align-items: center;
    }

    &__hamburger {
        margin-left: rem(-20px);
    }

    &__right {
        justify-self: end;
    }

    &__user {
        display: flex;
        align-items: center;
        gap: rem(20px);
    }
}

.header-logo {
    &--desktop {
        display: none;
    }

    &--mobile {
        display: block;
    }

    @include screen($desktop) {
        &--desktop {
            display: block;
        }

        &--mobile {
            display: none;
        }
    }
}
</style>
