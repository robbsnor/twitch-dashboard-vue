<script setup lang="ts">
import { computed, useSlots } from 'vue';

const slots = useSlots();

interface Props {
    modifier?: string;
    title?: string;
    first?: boolean;
    hideHeader?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits([]);

const classes = computed(() => {
    return {
        'section': true,
        'section-first': props.first,
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
    padding-bottom: rem(50px);

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
        gap: rem($padding-larger);
        padding-bottom: rem($padding-larger);
    }

    &__title {
        padding: 0;
    }



    &--first {
        margin-top: $header-height
    }

    // temp
    &--hide-header {
        #{ $self }__header {
            display: none;
        }
    }

    @include screen($desktop) {
        &__header {
            flex-direction: row;
            align-items: flex-end;
        }

        &__actions {
            min-width: rem(336px);
        }
    }
}
</style>
