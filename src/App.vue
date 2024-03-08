<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './app/auth/stores/auth.store';
import Header from './app/base/components/Header.vue';
import ButtonGroup from './app/shared/components/ButtonGroup.vue';

const authStore = useAuthStore()

onMounted(async () => {
    authStore.signIn()
})
</script>

<template>
    <Header
        :user="authStore.user"
        @sign-out="authStore.signOut"
    />

    <main class="app__main">
        <ButtonGroup>
            <RouterLink to="/" color="secondary">home</RouterLink>
            <RouterLink to="/live" color="secondary">live</RouterLink>
        </ButtonGroup>

        <RouterView />
    </main>
</template>./app/base/components/Header.vue./app/auth/stores/auth.store
