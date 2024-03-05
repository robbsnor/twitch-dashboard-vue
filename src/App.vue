<script setup lang="ts">
import type { Session } from '@supabase/supabase-js';
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { supabase } from './supabase';

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
