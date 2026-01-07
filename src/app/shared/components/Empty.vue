<script setup lang="ts">
import { computed, useSlots } from 'vue';

const slots = useSlots();

const props = defineProps<{
    title: string;
    description?: string;
    icon?: string;
}>();

const cssClass = computed(() => {
    return {
        empty: true,
    };
});
</script>

<template>
    <div class="flex items-center justify-center flex-col p-4">
        <div v-if="props.icon" class="bg-black-200 rounded-md p-4 mb-5">
            <v-icon :icon="props.icon" class="text-primary" />
        </div>

        <h3 v-if="props.title" class="text-primary pb-2">{{ props.title }}</h3>
        <p v-if="props.description" class="text-muted">{{ props.description }}</p>

        <div v-if="slots.default">
            <slot></slot>
        </div>
    </div>
</template>
