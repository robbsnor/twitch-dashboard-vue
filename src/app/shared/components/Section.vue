<script setup lang="ts">
import { computed } from 'vue';
import Swirl from './Swirl.vue';

interface Props {
  modifier?: string;
  title?: string;
  first?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits([])

const classes = computed(() => {
    const firstClass = props.first ? 'section--first' : '';
    const modifierClass = props.modifier ? `seciton--${props.modifier}` : '';

    return `section ${firstClass} ${modifierClass}`
})
</script>

<template>
    <section :class="classes">
        <slot name="background-art" class="section__background-art"></slot>

        <div class="section__header">
            <h2 class="section__title">{{ props.title }}</h2>

            <div class="section__actions">
                <slot name="actions"></slot>
            </div>
        </div>

        <div class="section__body">
            <slot></slot>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/functions/rem';
@import '/src/assets/styles/mixins/container';

.section {
    position: relative;
    padding: rem(50px) 0;

    &--first {
        margin-top: $header-height
    }

    &__header,
    &__body {
        @include container();
        overflow: hidden;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: rem($padding);
        align-items: flex-end;
        padding-bottom: rem(16px);
    }

    &__title {
        padding: 0;
    }
}
</style>
