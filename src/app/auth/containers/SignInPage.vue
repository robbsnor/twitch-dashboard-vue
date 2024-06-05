<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

onMounted(async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    await authStore.signIn();
});

watch(user, async (value) => {
    if (!value) return;
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push({ name: 'live' });
});
</script>

<template>
    <div class="log-in">
        <Section>
            <Spinner v-if="!user" padding text="Signing you in..."/>

            <div v-else class="welcome">
                <h1>Welcome, {{ user.display_name }}</h1>
                <p>Redirecting you to your dashboard...</p>
            </div>
        </Section>
    </div>
</template>

