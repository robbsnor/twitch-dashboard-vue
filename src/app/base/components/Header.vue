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
        image: 'https://via.placeholder.com/1280/720',
        videoId: 123123,
        user: {
            id: 111111,
            name: 'Lekkerspelen',
        },
        percentage: 50,
    },
    {
        title: 'Mario kart',
        image: 'https://via.placeholder.com/1280/720',
        videoId: 8979879078,
        user: {
            id: 2132131,
            name: 'Etho',
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
                        <vue-feather class="header__downloads" v-bind="props" type="download" />
                    </template>

                    <div class="menu">
                        <div class="download" v-for="download in downloads" :key="download.videoId">
                            <img class="download__image" :src="download.image" :alt="download.title" />
                            <div class="download__info">
                                <div class="download__title">{{ download.title }}</div>
                                <div class="download__user">{{ download.user.name }}</div>
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
    border: 1px solid $c-black-10;
}

.download {
    display: flex;
    gap: 16px;
    padding: 16px;

     &__image {
        width: 50px;
        height: auto;
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
