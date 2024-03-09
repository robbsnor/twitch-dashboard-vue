<script setup lang="ts">
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import type { TwitchVideo } from '@/app/shared/models/twitch/videos.model';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { TwitchService } from '../app/shared/services/twitch.service';

const twitchService = new TwitchService();
const route = useRoute();

const user = ref<TwitchUser>()
const videos = ref<TwitchVideo[]>()

onMounted(async () => {
    const userLogin = route.params.userLogin as string;
    user.value = (await twitchService.getUsers({ logins: [userLogin] }))[0];
    videos.value = await twitchService.getVideos(Number(user.value.id));
})
</script>

<template>
    <div class="user">
        <code>{{ videos }}</code>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.user {
    padding-top: $header-height;
}
</style>
