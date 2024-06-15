<script setup lang="ts">
import { defineModel } from 'vue';

const emits = defineEmits(['close']);

const dialog = defineModel<boolean>('dialog');

const props = withDefaults(defineProps<{
    title?: string;
    description?: string;
}>(), {
    title: 'Dialog',
});

const close = () => {
    emits('close');
    dialog.value = !dialog.value;
};
</script>

<template>
    <v-dialog v-model="dialog" width="auto">
        <div class="dialog">
            <div class="dialog__header">
                <h2 class="dialog__title">{{ props.title }}</h2>
                <p v-if="props.description" class="dialog__description">{{ props.description }}</p>
            </div>

            <div class="dialog__body">
                <slot></slot>
            </div>

            <div class="dialog__footer">
                <button @click="close()" class="dialog__close">
                    <span class="sr-only">Close</span>
                    <v-icon icon="mdi-window-close" class="dialog__close-icon" />
                </button>
            </div>
        </div>
    </v-dialog>
</template>

<style scoped lang="scss">
.dialog {
    $self: &;

    position: relative;
    padding: rem(30px);
    // background-color: orange;
    // background-color: $c-black-1;
    // border: 1px solid $c-black-4;
    // border-radius: $border-radius-large;

    &__body {
        max-height: 80vh;
        overflow: auto;
        padding-bottom: 60px + 10px;
    }

    &__footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        background-image: linear-gradient(to top, $c-black-1, transparent);
    }

    &__close {
        width: 60px;
        height: 60px;
        border-bottom: 2px solid $c-white;
        color: $c-white;
        pointer-events: all;

        &:hover {
            background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .4) 100%);

            #{ $self }__close-icon {
                scale: 1.2;
            }
        }
    }

    &__close-icon {
        transition: .1s;
    }
}
</style>
