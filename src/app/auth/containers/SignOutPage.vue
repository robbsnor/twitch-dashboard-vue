<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const router = useRouter();
const authStore = useAuthStore();
const step = ref(0);

onMounted(async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    step.value = 1;

    await authStore.signOut();
    await new Promise(resolve => setTimeout(resolve, 1000));

    router.push({ name: 'home' });
});
</script>

<template>
    <div class="sign-out">
        <Section>
            <Spinner v-if="step === 0" padding text="Logging you out..." />
            <Spinner v-if="step === 1" padding text="Logging out successful, returning you back home..." />
        </Section>
    </div>
</template>

<style lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.sign-out {}
</style>
