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
    router.push({ name: 'live' });
});
</script>

<template>
    <div class="log-in">
        <Section first>
            <Spinner padding text="Loggin you in..."/>
        </Section>
    </div>
</template>

