<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useFollowingStore } from '../stores/following.store';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import type { TwitchFollowedStreamWithUser } from '@/app/shared/models/twitch/followed-streams-with-user.model';
import ManageFavouriteDialog from './ManageFavouriteDialog.vue';
import { ref } from 'vue';

const router = useRouter();
const toast = useToast();
const favouriteStore = useFavouriteStore();

const emits = defineEmits(['add-favourite', 'edit-favourites']);

const props = withDefaults(
    defineProps<{
        stream: TwitchFollowedStreamWithUser;
        isFavourite: boolean;
        showFilterBy?: boolean;
    }>(),
    {
        showFilterBy: true,
    }
);
const followingStore = useFollowingStore();
const sheet = defineModel<boolean>('sheet');

const goToGamePage = (game: string) => {
    router.push({ name: 'game', params: { gameName: game } });
};

const copyuserId = (userId: string) => {
    const { copy, copied } = useClipboard();
    copy(userId.toString());
    toast.success(`Copied ID: ${userId}`, { duration: 4000 });
};

const doFiltering = () => {
    followingStore.filter = props.stream.game_name;
    sheet.value = false;
};

const addToFavourites = () => {
    sheet.value = false;
    emits('add-favourite');
};

async function manageFavourites() {
    emits('edit-favourites');
    sheet.value = false;
}
</script>

<template>
    <v-list>
        <Divider :text="stream.user_name" />
        <v-list-item v-if="isFavourite" class="text-primary" prepend-icon="mdi-heart" @click="manageFavourites()">
            Manage favourites
        </v-list-item>
        <v-list-item v-else prepend-icon="mdi-heart-plus" @click="addToFavourites()" class="text-primary">
            Add to favourites
        </v-list-item>
        <v-list-item prepend-icon="mdi-content-copy" @click="copyuserId(stream.user_id)"> Copy user id </v-list-item>
        <v-list-item prepend-icon="mdi-account" :to="{ name: 'user', params: { userLogin: stream.user_login } }">
            View profile
        </v-list-item>
        <v-list-item prepend-icon="mdi-play" :href="`https://www.twitch.tv/${stream.user_login}/`" target="_blank">
            Watch stream <v-icon :size="12" class="small-icon">mdi-open-in-new</v-icon>
        </v-list-item>
        <Divider :text="stream.game_name" />
        <v-list-item v-if="stream.game_name" prepend-icon="mdi-magnify" @click="goToGamePage(stream.game_name)">
            Explore category
        </v-list-item>
        <v-list-item prepend-icon="mdi-filter-variant" @click="doFiltering()"> Filter following streams </v-list-item>
    </v-list>
</template>

<style scoped lang="scss">
.small-icon {
    margin-left: 4px;
    color: $c-black-12;
}
</style>
