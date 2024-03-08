<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './app/auth/stores/auth.store';
import Header from './app/base/components/Header.vue';
import Dropdown from './app/base/components/Dropdown.vue';
import ButtonGroup from './app/shared/components/ButtonGroup.vue';

const authStore = useAuthStore()

const menuOpen = ref(false)

onMounted(async () => {
    authStore.signIn()
})
</script>

<template>
    <Header
        class="app__header"
        :user="authStore.user"
        @sign-out="authStore.signOut"
        @toggle-menu="menuOpen = !menuOpen"
    />

    <Dropdown
        class="app__dropdown"
        :open="menuOpen"
    />

    <main class="app__main">
        <ButtonGroup>
            <RouterLink to="/" color="secondary">home</RouterLink>
            <RouterLink to="/live" color="secondary">live</RouterLink>
        </ButtonGroup>

        <RouterView />
    </main>
</template>

<style scoped lang="scss">
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
