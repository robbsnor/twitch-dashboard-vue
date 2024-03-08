<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/layout/Header.vue';
import { useAuthStore } from './stores/auth.store';
import ButtonGroup from './components/shared/ButtonGroup.vue';
import { onMounted } from 'vue';

const authStore = useAuthStore()

onMounted(async () => {
})
</script>

<template>
    <Header
    />

    <main class="app__main">
        <ButtonGroup>
            <RouterLink to="/" color="secondary">home</RouterLink>
            <RouterLink to="/live" color="secondary">live</RouterLink>
        </ButtonGroup>

        <RouterView />
    </main>
</template>
