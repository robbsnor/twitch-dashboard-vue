<script setup lang="ts">
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import type { TwitchVideo } from '@/app/shared/models/twitch/videos.model';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { TwitchService } from '../app/shared/services/twitch.service';
// TODO: naming conflicts
import type { CardVideo as CardVideoType } from '../app/user/models/card-video.model';
import { CardVideoFactory } from '../app/user/factories/card-video.factory';
import CardVideo from '../app/user/components/CardVideo.vue';
import StreamType from '../app/user/components/StreamTypePicker.vue';

const twitchService = new TwitchService();
const route = useRoute();

const user = ref<TwitchUser>()
const videos = ref<TwitchVideo[]>()
const cards = ref<CardVideoType[]>()

onMounted(async () => {
    const userLogin = route.params.userLogin as string;
    console.log(userLogin)
    user.value = (await twitchService.getUsers({ logins: [userLogin] }))[0];
    videos.value = await twitchService.getVideos(Number(user.value.id));
    cards.value = CardVideoFactory.mapToCardVideo(videos.value);
})
</script>

<template>
    <div class="user">
        <!-- <StreamType></StreamType> -->
        <CardVideo v-for="card in cards" :card="card" :key="card.id" />
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
