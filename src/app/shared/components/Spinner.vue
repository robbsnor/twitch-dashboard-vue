<script setup lang="ts">
interface Props {
    text?: string,
}

const props = defineProps<Props>()
</script>

<template>
    <div class="spinner">
        <div class="spinner__circles">
            <div class="spinner__circle"></div>
            <div class="spinner__circle"></div>
        </div>
    <div v-if="props.text" class="spinner__text">{{ props.text }}</div>
</div>

</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/functions/rem';

.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: rem(20px);
    padding: rem(150px);

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
}

@keyframes ripple {
    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>
