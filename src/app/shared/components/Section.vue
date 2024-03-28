<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modifier?: string;
  title?: string;
  first?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits([])

const classes = computed(() => {
    const firstClass = props.first ? 'section--first' : '';
    const modifierClass = props.modifier ? `section--${props.modifier}` : '';

    return `section ${firstClass} ${modifierClass}`
})
</script>

<template>
    <section :class="classes">

        <div class="section__background-art">
            <slot name="background-art"></slot>
        </div>

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
    $self: &;

    position: relative;
    padding: rem(50px) 0;

    &__background-art {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    &__header,
    &__body {
        @include container();
        overflow: hidden;
    }

    &__header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: rem($padding);
        padding-bottom: rem(16px);
    }

    &__title {
        padding: 0;
    }

    &--first {
        margin-top: $header-height
    }

    @include screen($desktop) {
        &__header {
            flex-direction: row;
        }

        &__actions {
            min-width: rem(336px);
        }
    }

    &--user-cards {
        padding-top: 0;
    }
}
</style>
