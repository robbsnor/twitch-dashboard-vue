<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import type { AddFavourtieUserProps } from "./AddFavouriteDialog.vue";

const router = useRouter();
const toast = useToast();

const emits = defineEmits(['add-favourite']);

const props = withDefaults(defineProps<{
    username: string;
    userId: number;
    game: string;
    isFavourite: boolean;
    showFilterBy?: boolean;
}>(), {
    showFilterBy: true,
});

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

const addToFavourites = () => {
    sheet.value = false;
    emits('add-favourite', props.userId);
    console.log('Adding to favourites...');
};

const removeFromFavourites = () => {
    sheet.value = false;
    console.log('Removing from favourites...');
};
</script>

<template>
    <v-list>
        <Divider :text="props.username" />
        <v-list-item
            v-if="props.isFavourite"
            prepend-icon="mdi-heart-remove"
            @click="removeFromFavourites()"
        >
            Remove from favourites
        </v-list-item>
        <v-list-item
            v-else
            prepend-icon="mdi-heart-plus"
            @click="addToFavourites()"
        >
            Add to favourites
        </v-list-item>
        <v-list-item
            prepend-icon="mdi-content-copy"
            @click="copyuserId(props.userId)"
        >
            Copy user id
        </v-list-item>
        <v-list-item
            prepend-icon="mdi-account"
            :to="{ name: 'user', params: { userLogin: props.username } }"
        >
            View profile
        </v-list-item>
        <v-list-item
            prepend-icon="mdi-play"
            :href="`https://www.twitch.tv/${props.username}/`"
            target="_blank"
        >
            Watch stream <v-icon :size="12" class="small-icon">mdi-open-in-new</v-icon>
        </v-list-item>
        <Divider :text="props.game" />
        <v-list-item
            prepend-icon="mdi-magnify"
            @click="goToGamePage(props.game)"
        >
            Find other streams
        </v-list-item>
        <v-list-item
            v-if="props.showFilterBy"
            prepend-icon="mdi-filter-variant"
            @click="doFiltering()"
        >
            Filter following streams
        </v-list-item>
    </v-list>
</template>

<style scoped lang="scss">
.small-icon {
    margin-left: 4px;
    color: $c-black-12;
}
</style>
