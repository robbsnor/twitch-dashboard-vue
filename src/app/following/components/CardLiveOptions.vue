<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const router = useRouter();
const toast = useToast();

const props = defineProps<{
    username: string;
    userId: number;
    game: string;
}>();

const filter = defineModel<string>('filter');
const sheet = defineModel<boolean>('sheet');

const goToGamePage = (game: string) => {
    router.push({ name: "game", params: { gameName: game } });
};

const copyuserId = (userId: number) => {
    const { copy, copied } = useClipboard();
    copy(userId.toString());
    toast.success(`Copied ID: ${userId}`, { duration: 4000 });
};

const doFiltering = () => {
    filter.value = props.game;
    sheet.value = false;
};
</script>

<template>
    <v-list>
        <Divider :text="props.username" />
        <v-list-item
            prepend-icon="mdi-heart"
            link
        >
            Add to favourites
        </v-list-item>
        <v-list-item
            prepend-icon="mdi-account"
            :to="{ name: 'user', params: { userLogin: props.username } }"
        >
            View profile
        </v-list-item>
        <v-list-item
            prepend-icon="mdi-play"
            :to="{ name: 'user', params: { userLogin: props.username } }"
        >
            Watch stream
        </v-list-item>
        <Divider />
        <v-list-item
            prepend-icon="mdi-magnify"
            @click="goToGamePage(props.game)"
        >
            Search streams: {{ props.game }}
        </v-list-item>
        <v-list-item
            prepend-icon="mdi-filter-variant"
            @click="doFiltering()"
        >
            Filter by: {{ props.game }}
        </v-list-item>
        <Divider />
        <v-list-item
            prepend-icon="mdi-content-copy"
            @click="copyuserId(props.userId)"
        >
            Copy user id
        </v-list-item>
    </v-list>
</template>

<style scoped lang="scss">
</style>
