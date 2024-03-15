<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './app/auth/stores/auth.store';
import Header from './app/base/components/Header.vue';
import Dropdown from './app/base/components/Dropdown.vue';
import VueFeather from 'vue-feather';
import Spinner from './app/shared/components/Spinner.vue';
import { onKeyStroke } from '@vueuse/core';

const authStore = useAuthStore();

const menuOpen = ref(false);
const mainMinHeight = ref(0);

onMounted(async () => {
    authStore.signIn();
    getMainMinHeight();
})

onKeyStroke(['w', 'W'], (e) => toggleMenu(), { dedupe: true })
onKeyStroke(['Escape'], (e) => menuOpen.value = false, { dedupe: true })

const toggleMenu = () => menuOpen.value = !menuOpen.value;

const getMainMinHeight = () => {
    const header = document.querySelector('.app__header')! as HTMLElement;
    const footer = document.querySelector('.footer')! as HTMLElement;
    mainMinHeight.value = window.innerHeight - header.clientHeight - footer.clientHeight;
}
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

    <footer class="footer">
        <a class="footer_icon_link" href="https://github.com/robbsnor/twitch-dashboard-vue" target="_blank">
            <vue-feather class="github-icon" type="github"></vue-feather>
        </a>
    </footer>
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

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px rem($padding);
    background-color: $c-black-2;
}

.footer_icon_link {
    transition: .2s;
    color: $c-black-6;

    &:hover {
        color: $c-primary;
    }
}
</style>
