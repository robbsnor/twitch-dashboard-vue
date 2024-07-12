<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    padding?: boolean;
    text?: string,
}

const props = defineProps<Props>();

const classes = computed(() => {
    return {
        'spinner': true,
        [`spinner--padding`]: props.padding,
    };
});
</script>

<template>
    <div :class="classes">
        <div class="spinner__circles">
            <div class="spinner__circle"></div>
            <div class="spinner__circle"></div>
        </div>

        <div v-if="props.text" class="spinner__text">{{ props.text }}</div>
    </div>
</template>

<style scoped lang="scss">
.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: rem(20px);

    &__circles {
        position: relative;
        width: rem(48px);
        height: rem(48px);
    }

    &__circle {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        animation: ripple 1.5s ease-out infinite;
        border: rem(8px) solid $c-primary;
        transform: scale(0);
        opacity: 1;

        &:nth-child(2) {
            animation-delay: .25s;
        }
    }

    &__text {
        color: $c-white--dark;
    }

    &--padding {
        padding: rem(100px) 0;
    }
}

@keyframes ripple {
    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>
