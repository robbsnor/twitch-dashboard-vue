<script setup lang="ts">
const emits = defineEmits(['close']);
</script>

<template>
    <div class="dialog-base">
        <div class="dialog-base__body">
            <slot></slot>
        </div>

        <div class="dialog-base__footer">
            <button @click="emits('close')" class="dialog-base__close">
                <span class="sr-only">Close</span>
                <v-icon icon="mdi-window-close" class="dialog-base__close-icon" />
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dialog-base {
    $self: &;

    position: relative;
    // background-color: orange;

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
