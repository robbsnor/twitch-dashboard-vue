<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    await authStore.signOut();
    router.push({ name: 'home' });
});
</script>

<template>
    <div first class="sign-out">
        <Section>
            <Spinner padding text="Logging out..." />
        </Section>
    </div>
</template>

<style lang="scss">
.sign-out {}
</style>
