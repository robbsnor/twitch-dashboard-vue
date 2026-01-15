<script setup lang="ts">
import { useAuthStore } from '@/app/auth/stores/auth.store';
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import Dropdown from '@/app/base/components/Dropdown.vue';
import Footer from '@/app/base/components/Footer.vue';
import Header from '@/app/base/components/Header.vue';

const authStore = useAuthStore();
const menuOpen = ref(false);

const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const closeMenu = () => (menuOpen.value = false);
</script>

<template>
    <v-app>
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
