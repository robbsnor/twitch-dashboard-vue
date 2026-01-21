<script setup lang="ts">
import Empty from '@/app/shared/components/Empty.vue';
import type { TwitchFollowedStreamWithUser } from '@/app/shared/models/twitch/followed-streams-with-user.model';
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import { PromiseService } from '@/app/shared/services/promise.service';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import _ from 'lodash';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toast-notification';

const favouriteStore = useFavouriteStore();
const toast = useToast();
const dialog = defineModel<boolean>();
const saving = ref(false);
const users = ref<TwitchUser[]>([]);
const hasChanges = computed(() => !_.isEqual(users.value, favouriteStore.twitchUsers));
const isFirstUser = computed(() => favouriteStore.users.length === 0 && props.stream);
const isExistingUser = computed(() => favouriteStore.twitchUsers.some((u) => u.id === props.stream.user_id));
const props = withDefaults(
    defineProps<{
        stream: TwitchFollowedStreamWithUser;
        allowInsertBelow?: boolean;
    }>(),
    {
        allowInsertBelow: true,
    }
);
const description = computed(() => {
    if (isExistingUser.value) return `Move or delete users from your favourites.`;
    if (props.stream) return `Add "${props.stream.display_name}" to favourites.`;
});
const title = computed(() => {
    if (isExistingUser.value) return 'Manage Favourites';
    if (props.stream) return 'Add to Favourites';
});
const icon = computed(() => {
    if (isExistingUser.value) return 'mdi-heart';
    if (props.stream) return 'mdi-heart-plus';
});

async function onOpen() {
    users.value = _.cloneDeep(favouriteStore.twitchUsers);

    if (isFirstUser.value) {
        add(0);
    }
}

async function add(index: number) {
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

function remove(index: number) {
    users.value.splice(index, 1);
}

function reset() {
    users.value = _.cloneDeep(favouriteStore.twitchUsers);
}

async function save() {
    saving.value = true;

    await PromiseService.sleep(500);
    await favouriteStore.setUsers(users.value.map((u) => Number(u.id)));
    toast.success('Favourites updated!');

    saving.value = false;
    dialog.value = false;
}
</script>

<template>
    <Dialog v-model="dialog" :title="title" :description="description" :icon="icon" @open="onOpen" width="500">
        <!-- <div class="p-2 border-b border-black-500">
            <v-autocomplete
                hid
                placeholder="Search users to add..."
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            >
                <template #prepend-inner>
                    <v-icon icon="mdi-magnify" />
                </template>
            </v-autocomplete>
        </div> -->

        <div v-if="users.length" class="flex flex-col max-h-150">
            <VueDraggable handle="._handle" :animation="200" v-model="users" v-fade-stagger="{ delay: 50 }">
                <div
                    v-for="(user, index) in users"
                    :key="user.id"
                    :class="{ 'bg-black-400 rounded': user.id === props.stream.user_id }"
                    class="flex items-center gap-4 py-2 px-4 bg-black-200 not-last:border-b border-black-500"
                >
                    <!-- <div class="text-muted font-bold text-right">
                        {{ index + 1 }}
                    </div> -->
                    <img :src="user.profile_image_url" alt="avatar" class="size-10 rounded-full" />
                    <div class="font-bold truncate" :class="{ 'text-primary': user.id === props.stream.user_id }">
                        {{ user.display_name }}
                    </div>
                    <div class="ml-auto flex items-center">
                        <v-btn
                            v-if="!isFirstUser"
                            icon="mdi-close"
                            size="small"
                            variant="plain"
                            color="red"
                            class="rounded!"
                            @click="remove(index)"
                        />

                        <v-btn
                            v-if="user.id !== props.stream.user_id && props.allowInsertBelow"
                            icon="mdi-arrow-left-bottom"
                            size="small"
                            variant="tonal"
                            color="primary"
                            class="rounded!"
                            @click="add(index)"
                        />

                        <v-icon
                            icon="mdi-drag"
                            variant="plain"
                            class="_handle cursor-move ml-2"
                            color="var(--color-black-800)"
                        />
                    </div>
                </div>
            </VueDraggable>
        </div>

        <Empty
            v-else
            icon="mdi-heart-outline"
            :description="`${props.stream.display_name} is not in your favourites yet.`"
        >
            <v-btn color="primary" variant="tonal" @click="add(0)"> Add to Favourites </v-btn>
        </Empty>

        <template #footer>
            <div class="flex items-center justify-between w-full">
                <v-btn
                    v-if="hasChanges && !isFirstUser"
                    variant="text"
                    @click="reset"
                    class="italic underline! text-xs! text-muted-more!"
                >
                    undo changes
                </v-btn>

                <div class="flex gap-4 ml-auto">
                    <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
                    <v-btn :disabled="!hasChanges" color="primary" variant="tonal" @click="save()" :loading="saving">
                        Save
                    </v-btn>
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
