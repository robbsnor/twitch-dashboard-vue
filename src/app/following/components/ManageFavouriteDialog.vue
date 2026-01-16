<script setup lang="ts">
import { useAuthStore } from '@/app/auth/stores/auth.store';
import { useTwitchApi } from '@/app/shared/composables/useTwitchApi.composable';
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import { PromiseService } from '@/app/shared/services/promise.service';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import { supabase } from '@/app/supabase';
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
const props = withDefaults(
    defineProps<{
        user: AddFavourtieUserProps;
        editmode?: boolean;
    }>(),
    {
        editmode: false,
    }
);
const form = ref<AddFavourtieUserProps[]>([]);
const description = `Add "${props.user.name}" to your favourites`;

async function onOpen() {
    loading.value = true;
    const res = await twitchApi.getUsers({ ids: favouriteStore.favouriteUserIds });

    form.value = res.data.map((user) => ({
        name: user.display_name,
        avatar: user.profile_image_url,
        id: Number(user.id),
    }));

    loading.value = false;
}

async function insertBelow(index: number) {
    // remove if exists
    const existingIndex = form.value.findIndex((u) => u.id === props.user.id);
    if (existingIndex !== -1) {
        form.value.splice(existingIndex, 1);
        if (existingIndex < index) {
            index--;
        }
    }

    // add
    form.value.splice(index + 1, 0, {
        name: props.user.name,
        avatar: props.user.avatar,
        id: props.user.id,
    });
}

function removeFavourite(index: number) {
    form.value.splice(index, 1);
}

async function save() {
    try {
        saving.value = true;

        await PromiseService.sleep(1000);
        await favouriteStore.setFavouriteUsers(form.value.map((u) => u.id));
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
                <VueDraggable handle="._handle" :animation="100" v-model="form" v-auto-animate>
                    <div
                        v-for="(user, index) in form"
                        :key="user.id"
                        :class="{ 'bg-black-400 rounded': user.id === props.user.id }"
                        class="flex items-center gap-4 py-2 px-4 bg-black-200 not-last:border-b border-black-500"
                    >
                        <div class="text-muted font-bold text-right">
                            {{ index + 1 }}
                        </div>
                        <img :src="user.avatar" alt="avatar" class="size-10 rounded-full" />
                        <div class="font-bold truncate" :class="{ 'text-primary': user.id === props.user.id }">
                            {{ user.name }}
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
                                v-if="user.id !== props.user.id && !props.editmode"
                                icon="mdi-arrow-left-bottom"
                                size="small"
                                variant="tonal"
                                color="primary"
                                class="rounded!"
                                @click="insertBelow(index)"
                            >
                            </v-btn>
                            <v-icon icon="mdi-drag" class="_handle cursor-move" color="var(--color-black-800)" />
                        </div>
                    </div>
                </VueDraggable>
            </div>
        </template>

        <Spinner v-else />

        <template #footer>
            <v-btn variant="tonal" @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="save()" :loading="saving">Save</v-btn>
        </template>
    </Dialog>
</template>

<style scoped>
.sortable-ghost {
    opacity: 0;
}

.sortable-drag {
    /* background-color: blue !important ;
    padding: 20px !important ; */
    opacity: 1 !important;
}
</style>
