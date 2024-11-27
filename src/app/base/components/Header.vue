<script setup lang="ts">
import { ref } from 'vue';
import HeaderAvatar from './HeaderAvatar.vue';
import Hamburger from '@/app/base/components/Hamburger.vue';

const emits = defineEmits(['click-hamburger', 'click-logo']);

const props = defineProps<{
    user?: any;
    menuOpen: boolean;
}>();

const downloads = ref([
    {
        title: 'Laatste horror stream',
        image: 'https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/3cbe4a8a50f63227aeac_lekkerspelen_35677554686_6368170938/thumb/custom-d01f86a9-06a4-421d-9758-cbde29fde39e-320x180.jpeg',
        videoId: 123123,
        user: {
            id: 111111,
            name: 'Lekkerspelen',
            login: 'lekkerspelen',
        },
        percentage: 50,
    },
    {
        title: 'Mario kart',
        image: 'https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/feac9eab98b09d75d416_lekkerspelen_27320463437_9101370573/thumb/custom-c46a3380-6e60-4b01-b442-2887604a1cb7-320x180.jpeg',
        videoId: 8979879078,
        user: {
            id: 2132131,
            name: 'Etho',
            login: 'ethoslab',
        },
        percentage: 100,
    },
]);
</script>
<template>
    <header class="header">
        <div class="header__container">
            <div class="header__left">
                <div class="header__hamburger">
                    <Hamburger :menuOpen="props.menuOpen" @click="emits('click-hamburger')" />
                </div>
            </div>
            <RouterLink to="/following/live" @click="emits('click-logo')" class="header__logo">
                <div class="header-logo header-logo--desktop">
                    <Logo :payoff="true" />
                </div>
                <div class="header-logo header-logo--mobile">
                    <Logo :payoff="false" />
                </div>
            </RouterLink>
            <div class="header__right">
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <vue-feather class="header__downloads download-button" v-bind="props" type="download" />
                    </template>
                    <div class="menu">
                        <div class="download" v-for="download in downloads" :key="download.videoId">
                            <img class="download__image" :src="download.image" :alt="download.title" />
                            <div class="download__info">
                                <div class="download__title">{{ download.title }}</div>
                                <router-link class="download__user" :to="{ name: 'user', params: { userLogin: download.user.login } }">{{ download.user.name }}</router-link>
                                <v-progress-linear class="download__progress" color="primary" :model-value="download.percentage" />
                            </div>
                        </div>
                    </div>
                </v-menu>
                <button class="header__user">
                    <span class="sr-only">Username</span>
                    <HeaderAvatar v-if="props.user" :image="props.user.profile_image_url" />
                </button>
            </div>
        </div>
    </header>
</template>
<style scoped lang="scss">
.menu {
    border-radius: 6px;
    overflow: hidden;
    background-color: black;
    border: 1px solid $c-black-4;
}


.download-button {
    cursor: pointer;
    color: $c-black-20;
    transition: .2s;

    &:hover {
        color: $c-white;
    }
}

.download {
    display: flex;
    gap: 16px;
    padding: 16px;

    &__image {
        width: 100px;
        border-radius: 6px;
        flex-shrink: 0;
    }

    &__info {
        flex-grow: 1;
    }

    &__title {
        color: white;
        padding-bottom: 2px;
    }

    &__user {
        font-size: 14px;
        padding-bottom: 10px;
    }

    &__progress {
        width: 100%;
    }
}

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
        display: flex;
        align-items: center;
        gap: 20px;
    }

    &__user {
        display: flex;
        align-items: center;
        gap: rem(20px);
    }
}

.header-logo {
    transition: .1s;

    &--desktop {
        display: none;
    }

    &--mobile {
        display: block;
    }

    &:hover {
        scale: 1.02;
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
