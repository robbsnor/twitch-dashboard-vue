<script setup lang="ts">
import type { Menu } from '../models/menu.model';

const menus: Menu[] = [
    {
        title: 'Directory',
        items: [
            {
                text: 'Home',
                url: '/',
            },
            {
                text: 'Live',
                url: '/following/live',
            },
            {
                text: 'Users',
                url: '/following/users',
            },
            {
                text: 'Games',
                url: '/following/games',
            },
            {
                text: 'Playground',
                url: '/playground',
            },
        ],
    },
    {
        title: 'Favourites',
        items: [
            {
                text: 'Lekker spelen',
                url: '/user/lekkerspelen',
            },
            {
                text: 'Scuuurrrrr!!',
                url: '/user/goodtimeswithscar',
            },
        ],
    },
];

const props = defineProps<{
    open: any;
}>();
const emits = defineEmits(['closeMenu']);
</script>

<template>
    <div class="dropdown" :class="{ 'dropdown--open': props.open }">
        <button @click="emits('closeMenu')" class="dropdown__background">
            <span class="sr-only">Close menu</span>
        </button>

        <div class="dropdown__menu-container">
            <div class="dropdown__container">
                <div class="dropdown__navs">
                    <nav v-for="menu of menus" class="nav dropdown__nav" :key="menu.title">
                        <h2 class="nav__title text-4xl font-bold">{{ menu.title }}</h2>
                        <ArrowList :items="menu.items" @click:item="emits('closeMenu')"></ArrowList>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dropdown {
    $self: &;

    visibility: hidden;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 90;
    opacity: 0;
    transition: 0.2s;

    &__menu-container {
        position: relative;
        top: 0;
        background-color: $c-black-1;
        padding-top: $header-height;
        padding: ($header-height + rem(35px)) 0 rem(35px);
        max-height: 100vh;
        overflow-y: auto;
        transform-origin: top center;
        opacity: 0;
        scale: 1 0.9;
        transition: 0.2s;
    }

    &__container {
        @include container();
        position: relative;
    }

    &__navs {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: rem(40px);
    }

    &__background {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: rgba($c-black-1, 0.5);
        width: 100%;
    }

    &--open {
        visibility: visible;
        opacity: 1;

        #{ $self }__menu-container {
            visibility: visible;
            opacity: 1;
            scale: 1;
        }
    }

    @include screen($desktop) {
        &__navs {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @include screen(1400px) {
        &__navs {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
        }
    }
}

.nav {
    $self: &;

    &__title {
        font-size: rem(38px);
        color: white;
        padding-bottom: rem(15px);
    }
}
</style>
