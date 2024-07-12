<script setup lang="ts">
import { useAuthStore } from '@/app/auth/stores/auth.store';
import { onKeyStroke } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import Dropdown from '@/app/base/components/Dropdown.vue';
import Footer from '@/app/base/components/Footer.vue';
import Header from '@/app/base/components/Header.vue';

const authStore = useAuthStore();

const menuOpen = ref(false);
const mainMinHeight = ref(0);

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
const closeMenu = () => menuOpen.value = false;

onMounted(() => {
    mainMinHeight.value = getMainMinHeight();
});

const getMainMinHeight = () => {
    const headerHeight = document.querySelector('.app__header')?.clientHeight || 0;
    const footerHeight = document.querySelector('.app__footer')?.clientHeight || 0;
    return window.innerHeight - headerHeight - footerHeight;
};
</script>

<template>
    <v-app class="app">
        <div class="app__background"></div>

        <Header
            class="app__header"
            :user="authStore.user"
            :menuOpen="menuOpen"
            @click-profile="authStore.signOut"
            @click-logo="closeMenu"
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

        <Footer class="app__footer" />
    </v-app>
</template>

<style scoped lang="scss">
.app {
    &__background {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: url('https://images.unsplash.com/photo-1584204559709-ca7d413229eb?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        // background-image: url('https://plus.unsplash.com/premium_photo-1676272747130-348694463771?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        background-position: center;
        filter: blur(100px);
        opacity: .35;
    }

    &__header {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 100;
    }
}
</style>
