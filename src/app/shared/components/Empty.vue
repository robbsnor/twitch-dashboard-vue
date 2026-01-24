<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();

const props = defineProps<{
    title?: string;
    description?: string;
    icon?: string;
}>();
</script>

<template>
    <div class="flex items-center justify-center flex-col p-4">
        <div v-if="props.icon" class="bg-white/5 rounded-md p-4 mb-5">
            <v-icon :icon="props.icon" class="text-primary" />
        </div>

        <h3 v-if="props.title" class="text-2xl font-bold pb-2">{{ props.title }}</h3>
        <p v-if="props.description" class="text-muted pb-2">{{ props.description }}</p>

        <div v-if="slots.default" class="flex flex-col items-center">
            <slot></slot>
        </div>
    </div>
</template>
