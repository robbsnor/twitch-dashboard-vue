<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { twMerge } from 'tailwind-merge';

const slots = useSlots();

const props = defineProps<{
    title?: string;
    first?: boolean;
}>();
</script>

<template>
    <section :class="twMerge('relative py-6', props.first && 'mt-0')">
        <div v-if="slots.backgroundArt" class="absolute w-full h-full">
            <slot name="backgroundArt"></slot>
        </div>

        <Container>
            <div class="flex justify-between gap-4 pb-4 md:flex-row md:items-end">
                <div>
                    <h2 v-if="props.title" class="p-0 text-4xl font-bold">{{ props.title }}</h2>
                    <div v-if="slots.description">
                        <slot name="description"></slot>
                    </div>
                </div>

                <slot v-if="slots.actions" name="actions"></slot>
            </div>
        </Container>

        <Container>
            <slot></slot>
        </Container>
    </section>
</template>
