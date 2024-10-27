<script setup lang="ts">
import { defineModel, ref } from 'vue';

const favUsers = ref(["Etho", "Lekkerspelen", "ML7Support", "Emongg", "Ruski Fortnice player", "Slewya", "FurretCanWalk", "Shroud"]);

export interface AddFavourtieUserProps {
    name: string;
    avatar: string;
    id: number;
}

const dialog = defineModel<boolean>('dialog');

const props = defineProps<{
    user: AddFavourtieUserProps;
}>();

const title = `Add "${props.user?.name}" to your favourites`

const close = () => dialog.value = false;
const open = () => dialog.value = true;
</script>

<template>
    <Dialog
        v-model:dialog="dialog"
        :title="title"
    >
        <div class="body">
            <VueDraggable
                v-model="favUsers"
                :animation="150"
                tag="ol"
                class="users"
                handle=".user__drag-icon"
            >
                <li v-for="(user, i) in favUsers" :key="user" class="user">
                    <v-icon class="user__drag-icon">mdi-drag-horizontal-variant</v-icon> {{ i + 1 }} {{ user }}
                </li>
            </VueDraggable>
        </div>

        <template #footer>
            <div class="footer">
                <Button color="secondary" @click="close()">Cancel</Button>
                <Button>Add to favourites</Button>
            </div>
        </template>
    </Dialog>
</template>

<style scoped lang="scss">
.body {
    display: flex;
    flex-direction: column;
    gap: rem($padding-larger);
}

.users {
    .sortable-ghost {
        opacity: .2;
    }
}

.user {
    &__drag-icon {
        cursor: grab;
    }
}


.footer {
    display: flex;
    justify-content: flex-end;
    gap: rem($padding);
}
</style>
