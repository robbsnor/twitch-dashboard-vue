<script setup lang="ts">
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import type { TwitchVideo } from '@/app/shared/models/twitch/videos.model';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { TwitchService } from '../app/shared/services/twitch.service';
import { CardVideoFactory } from '../app/user/factories/card-video.factory';
import CardVideo from '../app/user/components/CardVideo.vue';
import StreamType from '../app/user/components/StreamTypePicker.vue';
import Section from '../app/shared/components/Section.vue';
import Button from '../app/shared/components/Button.vue';
import Spinner from '@/app/shared/components/Spinner.vue';
import StreamTypeMobile from '../app/user/components/StreamTypeMobile.vue';
import UserDrawer from '../app/user/components/UserDrawer.vue';
import { useAuthStore } from '@/app/auth/stores/auth.store';

const twitchService = new TwitchService();
const route = useRoute();
const authStore = useAuthStore();

// user
const user = ref<TwitchUser>();

// videos
const videos = ref<TwitchVideo[]>([]);
const videosCursor = ref<string>();

// followed
const isFollowing = ref<boolean>();
const isSubscribed = ref<boolean>();

// ui
const pageLoading = ref(true);
const videosLoading = ref(true);
const userNotFound = ref(false);
const cards = computed(() => CardVideoFactory.mapFromTwitchVideo(videos.value));

onMounted(async () => {
    await getInitialData(route.params.userLogin as string);
});

watch(
    () => route.params.userLogin as string,
    async (userLogin) => {
        await getInitialData(userLogin);
    }
);

const getInitialData = async (userLogin: string) => {
    // reset on route change
    pageLoading.value = true;
    user.value = undefined;
    videosCursor.value = undefined;
    videos.value = [];

    // get data
    getUser(userLogin)
        .then((_user) => {
            getVideos(_user);
            getIsFollowing(_user);
        })
        .catch(() => userNotFound.value = true)
        .finally(() => pageLoading.value = false)
}

const getUser = async (userLogin: string) => {
    const _user = (await twitchService.getUsers({ logins: [userLogin] }))[0];
    user.value = _user;
    return _user;
}

const getVideos = async (_user: TwitchUser) => {
    const res = await twitchService.getVideos(Number(_user.id));
    videos.value = [...videos.value, ...res.data];
    videosCursor.value = res.pagination.cursor;
}

const getIsFollowing = async (_user: TwitchUser) => {
    const res = await twitchService.getFollowedChannels(Number(authStore.user!.id), Number(_user.id));
    isFollowing.value = !!res.data.length;
}

const pageLoaded = computed(() => user.value && isFollowing.value !== undefined);

const loadMoreVideos = async () => {
    videosLoading.value = true;
    const _videos = await twitchService.getVideos(Number(user.value!.id), videosCursor.value);
    videos.value = [...videos.value, ..._videos.data];
    videosLoading.value = false;
}
</script>

<template>
    <div v-if="pageLoaded" class="user">
        <UserDrawer
            v-auto-animate
            :user="user!"
            :isFollowing="isFollowing!"
            :isSubscribed="false"
        />

        <!-- <StreamType></StreamType> -->
        <StreamTypeMobile></StreamTypeMobile>

        <Section v-if="cards" class="user__section">
            <div class="cards" v-auto-animate>
                <CardVideo v-for="card in cards" :card="card" :key="card.id" />
            </div>

            <Button v-if="!videosLoading" @click="loadMoreVideos">Load more</Button>
            <Spinner v-if="videosLoading"/>
        </Section>
    </div>

    <Spinner v-if="pageLoading" />

    <div v-if="userNotFound" class="not-found">
        <h4>User not found :( </h4>
        <h1 class="not-found__username">{{ route.params.userLogin }}</h1>
        <RouterLink to="/live">
            <Button icon="chevron-left" iconAlign="left">Back to dashboard</Button>
        </RouterLink>
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

.not-found {
    @include container;

    padding: rem(100px) 0;

    &__username {
        color: $c-primary;
    }
}
</style>
