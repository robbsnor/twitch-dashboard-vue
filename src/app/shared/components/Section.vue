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
    <section :class="twMerge('relative py-6', props.first && 'pt-0')">
        <div v-if="slots.backgroundArt" class="absolute w-full h-full pointer-events-none select-none">
            <slot name="backgroundArt"></slot>
        </div>

        <Container v-if="props.title || slots.description || slots.actions">
            <div class="flex flex-wrap justify-between gap-4 pb-4 md:flex-row md:items-end">
                <div>
                    <h2 v-if="props.title" class="p-0 text-3xl font-bold">{{ props.title }}</h2>
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
