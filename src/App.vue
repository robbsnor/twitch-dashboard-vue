<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Auth from './components/Auth.vue';

import { onMounted, ref } from 'vue'
import Account from './components/Account.vue'
import { supabase } from './supabase'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <header class="app__header">
        <RouterLink to="/">Home</RouterLink>
        <!-- <RouterLink to="/about">About</RouterLink> -->
  </header>

  <main class="app__main">
    <!-- <RouterView /> -->

    <Account v-if="session" :session="session" />
    <Auth v-else />
  </main>
</template>

<style scoped lang="scss">
.app {
  &__header {
    padding: 20px;
    border-bottom: 2px solid #222;
  }

  &__main {
    padding: 20px;
  }
}
</style>
