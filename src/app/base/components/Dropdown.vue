<script setup lang="ts">
import type { Menu } from '../models/menu.model';

const menus: Menu[] = [
    {
        title: 'Directory',
        items: [
            {
                text: 'Home',
                url: '/'
            },
            {
                text: 'Live',
                url: '/live'
            },
            // {
            //     text: 'Channels',
            //     url: '/channels'
            // },
        ]
    },
    {
        title: 'Favourites',
        items: [
            {
                text: 'Lekker spelen',
                url: '/user/lekkerspelen'
            },
        ]
    },
];

const props = defineProps<{
  open: any;
}>();
const emit = defineEmits(['closeMenu'])
</script>

<template>
    <div class="dropdown" :class="{'dropdown--open': props.open}">
        <button @click="emit('closeMenu')" class="dropdown__background"><span class="sr-only">Close menu</span></button>

        <div class="dropdown__menu-container">
            <div class="dropdown__container">
                <div class="dropdown__navs">
                    <nav v-for="menu of menus" class="nav dropdown__nav">
                        <h2 class="nav__title">{{ menu.title }}</h2>
                        <ul>
                            <li v-for="item in menu.items">
                                <RouterLink @click="emit('closeMenu')" :to="item.url">{{ item.text }}</RouterLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

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
    transition: .2s;

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
        scale: 1 .9;
        transition: .2s;
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
        background-color: rgba($c-black-1, .5);
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
