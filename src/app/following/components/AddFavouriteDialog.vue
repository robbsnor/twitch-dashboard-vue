<script setup lang="ts">
import { onMounted, ref } from 'vue';

const favUsers = ref([
    'Etho',
    'Lekkerspelen',
    'ML7Support',
    'Emongg',
    'Ruski Fortnice player',
    'Slewya',
    'FurretCanWalk',
    'Shroud',
]);

export interface AddFavourtieUserProps {
    name: string;
    avatar: string;
    id: number;
}

onMounted(() => {});

const dialog = defineModel<boolean>();

const props = defineProps<{
    user: AddFavourtieUserProps;
}>();

const title = `Add "${props.user?.name}" to your favourites`;

const close = () => (dialog.value = false);
const open = () => (dialog.value = true);
</script>

<template>
    <Dialog v-model="dialog" :title="title">
        <div></div>

        <template #footer>
            <Button color="secondary" @click="close()">Cancel</Button>
            <Button>Add to favourites</Button>
        </template>
    </Dialog>
</template>
