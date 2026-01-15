<script setup lang="ts">
import { useAuthStore } from '../../auth/stores/auth.store';
import { TitleService } from '../../shared/services/title.service';

const authStore = useAuthStore();
TitleService.setTitle('Home');
</script>

<template>
    <Section>
        <div class="copy max-w-[30%]">
            <h1 class="text-4xl font-black">Twitch Dashboard</h1>

            <p>
                Organize and filter your favourite streamers, easily re-watch previous streams in a clean presentable
                UI.
            </p>
            <p></p>

            <div class="flex gap-4">
                <v-btn>Features</v-btn>
                <v-btn v-if="authStore.user" to="/following/live">Dashboard</v-btn>
                <v-btn v-else @click="authStore.signIn()" prepend-icon="mdi-twitch" color="primary">
                    Log in with Twitch
                </v-btn>
            </div>
        </div>
    </Section>
</template>
