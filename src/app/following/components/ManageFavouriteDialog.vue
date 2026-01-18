<script setup lang="ts">
import { useTwitchApi } from '@/app/shared/composables/useTwitchApi.composable';
import type { TwitchFollowedStreamWithUser } from '@/app/shared/models/twitch/followed-streams-with-user.model';
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import { PromiseService } from '@/app/shared/services/promise.service';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import _ from 'lodash';
import { computed, ref } from 'vue';

export interface AddFavourtieUserProps {
    name: string;
    avatar: string;
    id: number;
}

const favouriteStore = useFavouriteStore();
const twitchApi = useTwitchApi();
const dialog = defineModel<boolean>();
const loading = ref(false);
const saving = ref(false);
const props = defineProps<{
    stream: TwitchFollowedStreamWithUser;
    editmode?: boolean;
}>();
const users = ref<TwitchUser[]>([]);
const usersOG = ref<TwitchUser[]>([]);
// const description = `Add "${props.stream.user_name}" to your favourites`;
const description = `Description coming soon...`;

const hasChanges = computed(() => {
    return !_.isEqual(users.value, usersOG.value);
});

async function onOpen() {
    loading.value = true;

    await PromiseService.sleep(200);
    const res = await twitchApi.getUsers({ ids: favouriteStore.favouriteUserIds });

    users.value = _.cloneDeep(res.data);
    usersOG.value = _.cloneDeep(res.data);

    loading.value = false;
}

async function insertBelow(index: number) {
    // remove existing
    const indexToRemove = users.value.findIndex((u) => u.id === props.stream.user_id);
    if (indexToRemove !== -1) {
        users.value.splice(indexToRemove, 1);

        if (indexToRemove < index) {
            index--;
        }
    }

    // add
    users.value.splice(index + 1, 0, props.stream);
}

function removeFavourite(index: number) {
    users.value.splice(index, 1);
}

function reset() {
    users.value = _.cloneDeep(usersOG.value);
}

async function save() {
    try {
        saving.value = true;

        await PromiseService.sleep(1000);
        await favouriteStore.setFavouriteUsers(users.value.map((u) => Number(u.id)));
    } finally {
        saving.value = false;
        dialog.value = false;
    }
}
</script>

<template>
    <Dialog v-model="dialog" title="Favourites" :description="description" icon="mdi-heart" @open="onOpen" width="500">
        <template v-if="!loading">
            <div class="flex flex-col max-h-150">
                <VueDraggable handle="._handle" :animation="100" v-model="users" v-auto-animate>
                    <div
                        v-for="(user, index) in users"
                        :key="user.id"
                        :class="{ 'bg-black-400 rounded': user.id === props.stream.user_id }"
                        class="flex items-center gap-4 py-2 px-4 bg-black-200 not-last:border-b border-black-500"
                    >
                        <v-icon icon="mdi-drag" class="_handle cursor-move" color="var(--color-black-800)" />
                        <!-- <div class="text-muted font-bold text-right">
                            {{ index + 1 }}
                        </div> -->
                        <img :src="user.profile_image_url" alt="avatar" class="size-10 rounded-full" />
                        <div class="font-bold truncate" :class="{ 'text-primary': user.id === props.stream.user_id }">
                            {{ user.display_name }}
                        </div>
                        <div class="ml-auto flex gap-4 items-center">
                            <v-btn
                                v-if="props.editmode"
                                icon="mdi-close"
                                size="small"
                                variant="tonal"
                                color="red"
                                class="rounded!"
                                @click="removeFavourite(index)"
                            ></v-btn>

                            <v-btn
                                v-if="user.id !== props.stream.user_id && !props.editmode"
                                icon="mdi-arrow-left-bottom"
                                size="small"
                                variant="tonal"
                                color="primary"
                                class="rounded!"
                                @click="insertBelow(index)"
                            >
                            </v-btn>
                        </div>
                    </div>
                </VueDraggable>
            </div>
        </template>

        <Spinner v-else />

        <template #footer>
            <div class="flex items-center justify-between w-full">
                <v-btn
                    v-if="hasChanges && editmode"
                    variant="text"
                    @click="reset"
                    class="italic underline! text-xs! text-muted-more!"
                >
                    undo changes
                </v-btn>

                <div class="flex gap-4 ml-auto">
                    <v-btn variant="tonal" @click="dialog = false">Cancel</v-btn>
                    <v-btn :disabled="!hasChanges" color="primary" @click="save()" :loading="saving">Save</v-btn>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<style scoped>
.sortable-ghost {
    opacity: 0.2;
}

.sortable-drag {
    /* background-color: blue !important ;
    padding: 20px !important ; */
    opacity: 1 !important;
}
</style>
