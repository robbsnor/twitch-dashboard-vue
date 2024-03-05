<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/layout/Header.vue';
import { useAuthStore } from './stores/auth.store';

const authStore = useAuthStore()
</script>

<template>
    <Header :session="authStore.session" />

    <main class="app__main">
        <RouterView />
    </main>
</template>
