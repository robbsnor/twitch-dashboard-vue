<script setup lang="ts">
import { useAuthStore } from '@/app/auth/stores/auth.store';
import { onKeyStroke } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import Dropdown from '@/app/base/components/Dropdown.vue';
import Footer from '@/app/base/components/Footer.vue';
import Header from '@/app/base/components/Header.vue';
import { useFavouriteStore } from './app/shared/stores/favourites.store';

const authStore = useAuthStore();
const favouriteStore = useFavouriteStore();
const menuOpen = ref(false);
const loading = ref(true);

onMounted(async () => {
    if (authStore.session) {
        await favouriteStore.init();
    }
    console.log('init');

    loading.value = false;
});

const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const closeMenu = () => (menuOpen.value = false);
</script>

<template>
    <v-app v-if="!loading">
        <div class="pt-height-header">
            <Header
                class="fixed inset-0 z-100"
                :user="authStore.user"
                :menuOpen="menuOpen"
                @click-profile="authStore.signOut"
                @click-logo="closeMenu"
                @click-hamburger="toggleMenu"
            />

            <Dropdown class="app__dropdown" :open="menuOpen" @closeMenu="toggleMenu" />

            <main>
                <RouterView />
            </main>

            <Footer />
        </div>
    </v-app>
</template>
