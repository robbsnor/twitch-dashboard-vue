<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AuthService } from '../services/auth.service';
import { useRouter } from 'vue-router';

const router = useRouter();
const step = ref(0);

onMounted(async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    step.value = 1;

    await new Promise(resolve => setTimeout(resolve, 2400));
    AuthService.signOut();
    router.push({ name: 'home' });
});
</script>

<template>
    <div class="logout">
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

.logout {}
</style>
