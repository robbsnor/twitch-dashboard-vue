<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useFollowingStore } from '../stores/following.store';
import Zombies from '../components/Zombies.vue';
import { TwitchClient, type TwitchGame } from '@/app/shared/composables/twitch-api';
import { useAuthStore } from '@/app/auth/stores/auth.store';
import { TwitchService } from '@/app/shared/services/twitch.service';

const authStore = useAuthStore();

const pages = ref([
    {
        name: 'Live',
        path: '/following/live',
    },
    {
        name: 'Users',
        path: '/following/users',
    },
    {
        name: 'Games',
        path: '/following/games',
    },
    {
        name: 'Zombies',
        path: '/following/zombies',
    },
]);

onMounted(async () => {
    // const authStore = useAuthStore();
    // const twitch = new TwitchClient({
    //     clientId: import.meta.env.VITE_TWITCH_CLIENT_ID,
    //     accessToken: authStore.twitchAccessToken as string,
    // });
    // const followedStreams = await twitch.getFollowedStreams({ userId: authStore.twitchUser!.provider_id! });
    // const userIds = followedStreams.map((stream) => stream.user_id);
    // const users = await twitch.getUsers({ ids: userIds });
    // const gameIds = [...new Set(followedStreams.map((stream) => stream.game_id))];
    // const games = await twitch.getGames({ ids: gameIds });
    // const streams = followedStreams.map((stream) => {
    //     const user = users.find((user) => user.id === stream.user_id);
    //     return {
    //         ...stream,
    //         ...user,
    //     };
    // });
    // console.log(followedStreams);
    // console.log(users);
    // console.log(streams);
});
</script>

<template>
    <div
        class="fixed bottom-4 left-4 right-4 bg-black-100 border border-black-200 rounded-[10px] z-50 flex gap-2 justify-around p-1 md:hidden"
    >
        <RouterLink
            v-for="page in pages"
            :key="page.name"
            :to="page.path"
            class="w-full flex items-center justify-center py-3 rounded-md transition"
            :class="{
                'hover:bg-black-200 text-muted': $route.path !== page.path,
                'bg-black-500': $route.path === page.path,
            }"
        >
            {{ page.name }}
        </RouterLink>
    </div>

    <Section first class="max-md:hidden">
        <PageTabs title="Following" :pages="pages" />
    </Section>

    <RouterView />
    <div>
        <code>
            <pre>
                {{ authStore.twitchUser }}
            </pre>
        </code>
    </div>
</template>
