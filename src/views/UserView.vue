<script setup lang="ts">
import { useAuthStore } from '@/app/auth/stores/auth.store';
import Spinner from '@/app/shared/components/Spinner.vue';
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import type { TwitchVideo } from '@/app/shared/models/twitch/videos.model';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Button from '../app/shared/components/Button.vue';
import Section from '../app/shared/components/Section.vue';
import { TwitchService } from '../app/shared/services/twitch.service';
import CardVideo from '../app/user/components/CardVideo.vue';
import StreamTypeMobile from '../app/user/components/StreamTypeMobile.vue';
import UserDrawer from '../app/user/components/UserDrawer.vue';
import { CardVideoFactory } from '../app/user/factories/card-video.factory';
import ButtonGroup from '../app/shared/components/ButtonGroup.vue';

const twitchService = new TwitchService();
const route = useRoute();
const authStore = useAuthStore();

// user
const user = ref<TwitchUser>();

// videos
const videos = ref<TwitchVideo[]>([]);
const videosCursor = ref<string>();
const cards = computed(() => CardVideoFactory.mapFromTwitchVideo(videos.value));

// followed
const isFollowing = ref<boolean>();
const isSubscribed = ref<boolean>();

// loaders
const pageIsLoading = ref(true);
const pageIsLoaded = computed(() => user.value && isFollowing.value !== undefined  && isSubscribed.value !== undefined);
const videosAreLoading = ref(true);

// error
const userNotFound = ref(false);

onMounted(async () => {
    await getInitialData(route.params.userLogin as string);
});

watch(
    () => route.params.userLogin as string,
    async (userLogin) => {
        // reset on route change
        user.value = undefined;
        videos.value = [];
        videosCursor.value = undefined;
        isFollowing.value = undefined;
        isSubscribed.value = undefined;
        pageIsLoading.value = true;
        videosAreLoading.value = true;
        userNotFound.value = false;

        await getInitialData(userLogin);
    }
);

const getInitialData = async (userLogin: string) => {
    // get data
    getUser(userLogin)
        .then((_user) => {
            getVideos(_user, 20);
            getIsFollowing(_user);
            getIsSubscribed(_user);
        })
        .catch(() => userNotFound.value = true)
        .finally(() => pageIsLoading.value = false)
}

const getUser = async (userLogin: string) => {
    const _user = (await twitchService.getUsers({ logins: [userLogin] }))[0];
    user.value = _user;
    return _user;
}

const getVideos = async (_user: TwitchUser, first: number, pagination?: string) => {
    videosAreLoading.value = true;
    const res = await twitchService.getVideos(Number(user.value!.id), videosCursor.value, first);
    videos.value = [...videos.value, ...res.data];
    videosCursor.value = res.pagination.cursor;
    setTimeout(() => videosAreLoading.value = false, 500);
}

const getIsFollowing = async (_user: TwitchUser) => {
    const res = await twitchService.getFollowedChannels(Number(authStore.user!.id), Number(_user.id));
    isFollowing.value = !!res.data.length;
}

const getIsSubscribed = async (_user: TwitchUser) => {
    isSubscribed.value = await twitchService.checkUserSubscription(Number(authStore.user!.id), Number(_user.id));
}

const loadMoreVideos = async () => {
    getVideos(user.value!, 100, videosCursor.value);
}
</script>

<template>
    <div v-if="pageIsLoaded" class="user">
        <UserDrawer
            v-auto-animate
            :user="user!"
            :isFollowing="isFollowing!"
            :isSubscribed="isSubscribed!"
        />

        <!-- <StreamType></StreamType> -->
        <StreamTypeMobile></StreamTypeMobile>

        <Section v-if="cards" class="user__section">
            <div class="cards" v-auto-animate>
                <CardVideo v-for="card in cards" :card="card" :key="card.id" />
            </div>

            <Button v-if="!videosAreLoading" @click="loadMoreVideos" class="cards__load-more">Load more</Button>
            <Spinner v-if="videosAreLoading" padding/>
        </Section>
    </div>

        <Spinner v-if="pageIsLoading" padding/>

        <div v-if="userNotFound" class="not-found">
            <h4><span class="not-found__username">"{{ route.params.userLogin }}"</span>, not found.</h4>
            <p>This user does not exist, yet...</p>

            <ButtonGroup class="not-found__buttons">
                <RouterLink to="/live">
                    <Button icon="chevron-left" iconAlign="left">Back to dashboard</Button>
                </RouterLink>
            </ButtonGroup>
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

    &__load-more {
        display: block;
        margin: rem(100px) auto;
    }

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
        font-size: rem(40px);
    }

    &__buttons {
        padding-top: 30px;
    }
}
</style>
