<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './app/auth/stores/auth.store';
import Dropdown from './app/base/components/Dropdown.vue';
import Footer from './app/base/components/Footer.vue';
import Header from './app/base/components/Header.vue';

const authStore = useAuthStore();

const menuOpen = ref(false);
const mainMinHeight = ref(0);

onMounted(async () => {
    authStore.signIn();
    getMainMinHeight();
});

onKeyStroke(['w', 'W'], (e) => {
    const isFocusingBody = document.activeElement === document.body;
    if (!isFocusingBody) return;

    toggleMenu();
}, { dedupe: true, target: document });

onKeyStroke(['Escape'], (e) => {
    const isFocusingBody = document.activeElement === document.body;
    if (!isFocusingBody) return;

    menuOpen.value = false;
}, { dedupe: true });

const toggleMenu = () => menuOpen.value = !menuOpen.value;

const getMainMinHeight = () => {
    const header = document.querySelector('.app__header')! as HTMLElement;
    const footer = document.querySelector('.app__footer')! as HTMLElement;
    mainMinHeight.value = window.innerHeight - header.clientHeight - footer.clientHeight;
};
</script>

<template>
    <Header
        class="app__header"
        :user="authStore.user"
        @click-profile="authStore.signOut"
        @click-hamburger="toggleMenu"
    />

    <Dropdown
        class="app__dropdown"
        :open="menuOpen"
        @closeMenu="toggleMenu"
    />

    <main class="app__main" :style="'min-height: ' + mainMinHeight + 'px'">
        <RouterView />
    </main>

    <Footer class="app__footer"></Footer>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/functions/rem';

.app {
    &__header {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 100;
    }
}
</style>
