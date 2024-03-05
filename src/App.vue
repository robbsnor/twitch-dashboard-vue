<script setup lang="ts">
import type { Session } from '@supabase/supabase-js';
import { onMounted, ref, type Ref } from 'vue';
import { RouterView } from 'vue-router';
import { supabase } from './supabase';

import Header from './components/layout/Header.vue';
import Button from './components/shared/Button.vue';

const session = ref<Session>()
const loading = ref(false)

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
    <main class="app__main">

        <Button type="a" to="/" >Home</Button>
        <Button type="a" to="/about" color="secondary">About</Button>

        <RouterView />
    </main>
</template>
