<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    title: string;
    description?: string;
}>();

const cssClass = computed(() => {
    return {
        empty: true,
    };
});
</script>

<template>
    <div :class="cssClass">
        <h3 v-if="props.title" class="empty__title">{{ props.title }}</h3>
        <p v-if="props.description" class="empty__description">{{ props.description }}</p>
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: rem($padding / 2);
    padding: rem($padding-larger);
    border-radius: rem($border-radius-normal);

    &__title {
        color: $c-text-base;
        padding-bottom: 0;
    }

    &__description {
        color: $c-text-base;
    }
}
</style>
