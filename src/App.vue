<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './app/auth/stores/auth.store';
import Header from './app/base/components/Header.vue';
import Dropdown from './app/base/components/Dropdown.vue';
import ButtonGroup from './app/shared/components/ButtonGroup.vue';
import VueFeather from 'vue-feather';
import Spinner from './app/shared/components/Spinner.vue';

const authStore = useAuthStore()

const menuOpen = ref(false)

onMounted(async () => {
    authStore.signIn()
})

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
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

    <main class="app__main">
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
    padding: 30px;
}

.footer_icon_link {
    transition: .2s;
    color: $c-black-5;

    &:hover {
        color: $c-primary;
    }
}
</style>
