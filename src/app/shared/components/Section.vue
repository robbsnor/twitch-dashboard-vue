<script setup lang="ts">
import { computed, useSlots } from 'vue';

const slots = useSlots();

interface Props {
    title?: string;
    first?: boolean;
    hideHeader?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits([]);

const classes = computed(() => {
    return {
        'section': true,
        'section--first': props.first,
        'section--no-title': !props.title,
        'section--hide-header': props.hideHeader,
    };
});
</script>

<template>
    <section :class="classes">
        <div class="section__background-art">
            <slot name="background-art"></slot>
        </div>

        <div class="section__header">
            <h2 v-if="props.title" class="section__title">{{ props.title }}</h2>

            <div v-if="slots.actions" class="section__actions">
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
    padding: rem(25px) 0;

    &__background-art {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    &__header,
    &__body {
        @include container();
    }

    &__header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: rem($padding-smaller);
        padding-bottom: rem($padding);
    }

    &__title {
        padding: 0;
    }

    &--first {
        padding-top: 0;
    }

    &--no-title {
        #{ $self }__actions {
            margin-left: auto;
        }
    }

    &--hide-header {
        #{ $self }__header {
            display: none;
        }
    }

    @include screen($desktop) {
        &__header {
            flex-direction: row;
            align-items: flex-end;
            gap: rem($padding-larger);
            padding-bottom: rem($padding-larger);
        }

        &__actions {
            min-width: rem(336px);
        }
    }
}
</style>
