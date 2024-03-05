<script setup lang="ts">
import type { Session } from '@supabase/supabase-js';
import { onMounted, ref, type Ref } from 'vue';
import { RouterView } from 'vue-router';
import { supabase } from './supabase';
import { useMouse } from './composables/use-mouse.composable'

import Header from './components/layout/Header.vue';
import Button from './components/shared/Button.vue';

const session = ref<Session>()
const loading = ref(false)
const { x, y } = useMouse()

onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
        session.value = data.session ?? undefined
    })

    supabase.auth.onAuthStateChange((_, _session) => {
        session.value = _session ?? undefined
    })
})

const signInWithTwitch = async () => {
    try {
        loading.value = true
        await supabase.auth.signInWithOAuth({
            provider: 'twitch',
        })
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false;
    }
}

const signOut = async () => {
    await supabase.auth.signOut()
}
</script>

<template>
  <Header :session="session" />
  <!-- <header class="app__header">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
  </header> -->

    <main class="app__main">
        <Button v-if="!session" type="a" @click="signInWithTwitch">Sign in with Twitch</Button>
        <Button v-else type="button" @click="signOut">Sign out</Button>

        <hr>
        <Button type="a" to="/" >Home</Button>
        <Button type="a" to="/about" color="secondary">About</Button>
        <hr>

        <code>
            {{ session }}
        </code>

        <hr>

        <RouterView />
    </main>
</template>

<style scoped lang="scss">
.app {
  &__header {
    padding: 20px;
    border-bottom: 2px solid #222;
    display: flex;
    gap: 20px;
  }

  &__main {
    padding: 20px;
  }
}
</style>./components/shared/MyButton.vue./components/shared/Button.vue
