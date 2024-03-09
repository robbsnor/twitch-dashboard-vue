<script setup lang="ts">
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import type { TwitchVideo } from '@/app/shared/models/twitch/videos.model';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { TwitchService } from '../app/shared/services/twitch.service';
// TODO: naming conflicts
import type { CardVideo as CardVideoType } from '../app/user/models/card-video.model';
import { CardVideoFactory } from '../app/user/factories/card-video.factory';
import CardVideo from '../app/user/components/CardVideo.vue';
import StreamType from '../app/user/components/StreamTypePicker.vue';
import Section from '../app/shared/components/Section.vue';
import Button from '../app/shared/components/Button.vue';
import Spinner from '@/app/shared/components/Spinner.vue';

const twitchService = new TwitchService();
const route = useRoute();

const user = ref<TwitchUser>()
const videos = ref<TwitchVideo[]>([])
const cursor = ref<string>()

const cards = computed(() => CardVideoFactory.mapToCardVideo(videos.value))

const getVideos = async () => {
    const res = await twitchService.getVideos(Number(user.value?.id), cursor.value);
    videos.value = [...videos.value, ...res.data];
    cursor.value = res.pagination.cursor;
}

onMounted(async () => {
    const userLogin = route.params.userLogin as string;
    user.value = (await twitchService.getUsers({ logins: [userLogin] }))[0];

    await getVideos();
})
</script>

<template>
    <div  class="user">
        <Section v-if="cards" :title="user?.display_name" class="user__section">
            <!-- <StreamType></StreamType> -->
            <div class="cards" v-auto-animate>
                <CardVideo v-for="card in cards" :card="card" :key="card.id" />
            </div>
            <Button @click="getVideos">Load more</Button>
        </Section>

        <Spinner v-else />
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.cards {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: rem(35px);

    @include screen($desktop) {
        grid-template-columns: repeat(3, 1fr);
    }

    @include screen(1200px) {
            grid-template-columns: repeat(4, 1fr);
    }

    @include screen(1400px) {
        grid-template-columns: repeat(5, 1fr);
    }
}
</style>
