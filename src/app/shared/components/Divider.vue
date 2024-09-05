<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    text?: string;
    padding?: 'small' | 'medium' | 'large';
    theme?: 'dark' | 'darker' | 'darkest';
}>(), {
    padding: 'small',
    theme: 'dark',
});

const cssClass = computed(() => {
    return {
        'divider': true,
        [`divider--padding-${props.padding}`]: true,
        [`divider--${props.theme}`]: true,
    };
});
</script>

<template>
    <div :class="cssClass">
        <div class="divider__line"></div>
        <div v-if="props.text" class="divider__text">{{ props.text }}</div>
        <div v-if="props.text" class="divider__line"></div>
    </div>
</template>

<style scoped lang="scss">
.divider {
    $self: &;

    display: flex;
    align-items: center;
    gap: rem($padding);

    &__line {
        flex: 1;
        height: 1px;
        background-color: $c-black-5;
    }

    &__text {
        color: $c-black-12;
    }

    &--padding {
        &-small {
            padding: rem(5px) 0;
        }

        &-medium {
            padding: rem(10px) 0;
        }

        &-large {
            padding: rem(15px) 0;
        }
    }
}
</style>
