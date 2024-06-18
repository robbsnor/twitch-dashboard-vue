<script setup lang="ts">
import { defineModel, useSlots } from 'vue';

const slots = useSlots();
const emits = defineEmits(['close']);

const dialog = defineModel<boolean>('dialog');

const props = withDefaults(defineProps<{
    title?: string;
    description?: string;
    width?: string | number;
    closeIcon?: boolean;
}>(), {
    title: 'Dialog',
    width: 500,
    closeIcon: true,
});

const close = () => {
    emits('close');
    dialog.value = !dialog.value;
};
</script>

<template>
    <v-dialog v-model="dialog" :width="props.width">
        <div class="dialog">
            <button v-if="props.closeIcon" @click="close()" class="dialog__close">
                <span class="sr-only">Close</span>
                <v-icon icon="mdi-window-close" class="dialog__close-icon" />
            </button>

            <div class="dialog__header">
                <h2 class="dialog__title">{{ props.title }}</h2>
                <p v-if="props.description" class="dialog__description">{{ props.description }}</p>
            </div>

            <div class="dialog__body">
                <slot></slot>
            </div>

            <div v-if="slots.footer" class="dialog__footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </v-dialog>
</template>

<style scoped lang="scss">
.dialog {
    $self: &;

    position: relative;

    &__header {
        padding-bottom: rem($padding);
    }

    &__body {
        max-height: 80vh;
        overflow: auto;
    }

    &__footer {}

    &__close {
        position: absolute;
        top: -60px - 20px;
        right: 0;
        width: 60px;
        height: 60px;
        border-bottom: 2px solid $c-white;
        color: $c-white;
        pointer-events: all;
        transition: .1s;

        &:hover {
            background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .25) 100%);
            background-color: $c-white;

            #{ $self }__close-icon {
                // scale: 1.2;
                color: $c-black-1;
                rotate: 90deg;
            }
        }
    }

    &__close-icon {
        transition: .1s;
    }

    &__footer {
        padding: 20px 0 0 0;
    }

    @include screen(1000px) {
        &__close {
            border-left: 2px solid $c-white;
            border-bottom: 0;
            right: -60px - 20px;
            top: 30px;
        }
    }
}
</style>
