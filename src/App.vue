<script setup lang="ts">
import { useAuthStore } from '@/app/auth/stores/auth.store';
import { onKeyStroke } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import Dropdown from '@/app/base/components/Dropdown.vue';
import Footer from '@/app/base/components/Footer.vue';
import Header from '@/app/base/components/Header.vue';
import AppOptionsDrawer from '@/app/base/containers/AppOptionsDrawer.vue';

const authStore = useAuthStore();

const menuOpen = ref(false);
const mainMinHeight = ref(0);
const settingsDrawer = ref(false);

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
        <Header
            class="app__header"
            :user="authStore.user"
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

        <Footer class="app__footer"></Footer>

        <AppOptionsDrawer v-model:drawer="settingsDrawer" />

        <v-btn
            class="app__settings"
            icon="mdi-cog"
            @click="settingsDrawer = !settingsDrawer"
        />
    </v-app>
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

    &__settings {
        position: fixed;
        bottom: rem($padding);
        right: rem($padding);
        z-index: 100;
        background-color: transparent;
        color: $c-black-20;
        transition: .2s;

        &:hover {
            background-color: $c-black-2;
            color: $c-primary;
        }
    }
}
</style>
