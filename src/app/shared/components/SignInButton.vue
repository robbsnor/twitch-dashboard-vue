<script setup lang="ts">
import { useAuthStore } from '@/app/auth/stores/auth.store';
import { refAutoReset } from '@vueuse/core';

const authStore = useAuthStore();
const loading = refAutoReset(false, 7000);
</script>

<template>
    <v-btn
        @click="
            () => {
                loading = true;
                authStore.signIn();
            }
        "
        append-icon="mdi-twitch"
        color="primary"
        :loading="loading"
    >
        Login with Twitch
    </v-btn>
</template>
