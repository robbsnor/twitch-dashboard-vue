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
    <div :class="cssClass">
        <div v-if="props.icon" class="empty__icon-container">
            <v-icon :icon="props.icon" class="empty__icon" />
        </div>

        <h3 v-if="props.title" class="empty__title">{{ props.title }}</h3>
        <p v-if="props.description" class="empty__description">{{ props.description }}</p>

        <div v-if="slots.default" class="empty__body">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: rem($padding-larger);
    border-radius: rem($border-radius-normal);

    &__icon-container {
        background-color: $c-black-4;
        border: 2px solid $c-black-5;
        border-radius: rem($border-radius-largestst);
        padding: 16px;
        margin-bottom: 20px;
    }

    &__icon {
        color: $c-primary;
    }

    &__title {
        color: $c-text-base;
        padding-bottom: 10px;
    }

    &__description {
        color: $c-text-base;
    }
}
</style>
