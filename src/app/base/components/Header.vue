<script setup lang="ts">
import { ref } from 'vue';
import HeaderAvatar from './HeaderAvatar.vue';
import Hamburger from '@/app/base/components/Hamburger.vue';

const emits = defineEmits(['click-hamburger', 'click-logo']);

const props = defineProps<{
    user?: any;
    menuOpen: boolean;
}>();
</script>

<template>
    <header class="h-header bg-linear-to-b from-black to-black/0">
        <Container class="grid items-center grid-cols-[1fr_auto_1fr] h-full">
            <div class="flex items-center">
                <div class="-ml-5">
                    <Hamburger :menuOpen="props.menuOpen" @click="emits('click-hamburger')" />
                </div>
            </div>

            <RouterLink to="/following/live" @click="emits('click-logo')" class="header__logo">
                <div class="transition-all md:hidden hover:scale-105">
                    <Logo :payoff="false" />
                </div>
                <div class="transition-all hidden md:block hover:scale-102">
                    <Logo :payoff="true" />
                </div>
            </RouterLink>

            <div class="flex justify-self-end items-center gap-4">
                <button class="flex items-center">
                    <span class="sr-only">Username</span>
                    <HeaderAvatar v-if="props.user" />
                </button>
            </div>
        </Container>
    </header>
</template>
