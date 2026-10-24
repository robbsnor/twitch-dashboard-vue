<script setup lang="ts">
import { useAuthStore } from '../../auth/stores/auth.store';
import { TitleService } from '../../shared/services/title.service';

const authStore = useAuthStore();
TitleService.setTitle('Home');
</script>

<template>
    <Section>
        <div class="copy xl:max-w-[30%]">
            <h1 class="text-4xl font-black">Twitch Dashboard</h1>
            <p>
                Organize and filter your favourite streamers, easily re-watch previous streams in a clean presentable
                UI.
            </p>
            <p></p>

            <div class="flex gap-4">
                <v-btn variant="text">Features</v-btn>
                <v-btn v-if="authStore.twitchUser" to="/following/live" color="primary">to Dashboard</v-btn>
                <SignInButton v-else> </SignInButton>
            </div>
        </div>
    </Section>
</template>
