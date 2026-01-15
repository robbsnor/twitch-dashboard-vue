<script setup lang="ts">
import { useTwitchApi } from '@/app/shared/composables/twitch-api.composable';
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import { PromiseService } from '@/app/shared/services/promise.service';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import { VueDraggableNext as draggable } from 'vue-draggable-next';
import { computed, onMounted, ref } from 'vue';

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
    user: AddFavourtieUserProps;
}>();
const favUsers = ref<AddFavourtieUserProps[]>([]);
const description = `Add "${props.user.name}" to your favourites`;

const isAddedToFavourites = computed(() => {
    return favUsers.value.some((u) => u.id === props.user.id);
});

async function onOpen() {
    loading.value = true;
    const res = await twitchApi.getUsers({ ids: favouriteStore.favouriteUserIds });
    await PromiseService.sleep(500);
    favUsers.value = res.data.map((user) => ({
        name: user.display_name,
        avatar: user.profile_image_url,
        id: Number(user.id),
    }));

    loading.value = false;
}

async function insert(index: number) {
    // remove if exists
    const existingIndex = favUsers.value.findIndex((u) => u.id === props.user.id);
    if (existingIndex !== -1) {
        favUsers.value.splice(existingIndex, 1);
        if (existingIndex < index) {
            index--;
        }
    }

    // add
    favUsers.value.splice(index + 1, 0, {
        name: props.user.name,
        avatar: props.user.avatar,
        id: props.user.id,
    });
}

function showButton(user: AddFavourtieUserProps, index: number) {
    if (index === favUsers.value.length - 1) {
        return true;
    }

    if (favUsers.value[index + 1].id === props.user.id) {
        return false;
    }

    return true;
}

async function save() {
    saving.value = true;

    await PromiseService.sleep(2000);

    // save
    // refetch
    await favouriteStore.fetchFavouriteUsers();

    saving.value = false;
    dialog.value = false;
}
</script>

<template>
    <Dialog v-model="dialog" title="Favourites" :description="description" icon="mdi-heart" @open="onOpen" width="500">
        <template v-if="!loading">
            <div class="flex flex-col max-h-150">
                <VueDraggable handle="._handle" ref="el" :animation="150" v-model="favUsers" v-auto-animatef>
                    <div
                        v-for="(user, index) in favUsers"
                        :key="user.id"
                        class="flex items-center gap-4 py-2 px-4 not-last:border-b border-black-500"
                        :class="{ 'bg-black-400 ': user.id === props.user.id }"
                    >
                        <v-icon icon="mdi-drag" class="_handle cursor-move" color="var(--color-black-800)" />
                        <div class="text-muted text-lg font-bold text-right">{{ index + 1 }}</div>
                        <img :src="user.avatar" alt="avatar" class="size-10 rounded-full" />
                        <div class="flex flex-col">
                            <span class="font-bold text-lg">{{ user.name }}</span>
                            <!-- <span class="text-sm text-muted">ID: {{ user.id }}</span> -->
                        </div>

                        <div class="ml-auto">
                            <v-btn
                                :disabled="!showButton(user, index)"
                                v-if="user.id !== props.user.id"
                                icon="mdi-arrow-left-bottom"
                                size="small"
                                variant="tonal"
                                color="primary"
                                class="rounded!"
                                @click="insert(index)"
                            >
                            </v-btn>
                        </div>
                    </div>
                </VueDraggable>
            </div>
        </template>
        <Spinner v-else />

        <template #footer>
            <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" :disabled="!isAddedToFavourites" @click="save()" :loading="saving">Save</v-btn>
        </template>
    </Dialog>
</template>

<style scoped>
.drag-container {
    min-height: 200px;
    padding: 20px;
}

.drag-item {
    padding: 10px;
    margin: 5px 0;
    background: #f0f0f0;
    border-radius: 4px;
    cursor: move;
    transition: background 0.2s;
}

.drag-item:hover {
    background: #e0e0e0;
}
</style>
