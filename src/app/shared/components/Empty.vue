<script setup lang="ts">
const props = defineProps<{
    title: string;
    description?: string;
}>();
</script>

<template>
    <div class="empty">
        <h3 v-html="props.title" class="empty__title" />
        <p class="empty__description">{{ props.description }}</p>
    </div>
</template>

<style scoped lang="scss">
.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: rem($padding);
    padding: rem($padding-larger);
    border-radius: rem($border-radius-normal);

    &__title {
        color: $c-text-base;
    }

    &__description {
        color: $c-primary;
    }
}
</style>
