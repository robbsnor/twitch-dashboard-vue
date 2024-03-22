<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    show: boolean;
    maxWidth?: string;
    title?: string;
}>();

const classes = computed(() => {
    const showClass = props.show ? `show` : '';

    return `drawer ${showClass}`;
})
</script>

<template>
    <div :class="classes">
        <div class="drawer__main" :style="{ maxWidth: props.maxWidth }">
            <div class="drawer__header">
                <h2 v-if="props.title" class="drawer__title">{{ props.title }}</h2>
                <button class="drawer__close">X</button>
            </div>

            <div class="drawer__body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.drawer {
    position: fixed;
    display: flex;
    width: 100%;
    justify-content: center;
    bottom: 0;
    transform: translateY(100%);
    transition: .2s;

    &__main {
        width: 100%;
        padding: 20px;
        background-color: $c-black-1;
        border: 1px solid $c-black-6;
        border-bottom: 0;
        border-radius: rem($border-radius-normal) rem($border-radius-normal) 0 0;
    }

    &.show {
        transform: translateY(0);
    }
}
</style>
