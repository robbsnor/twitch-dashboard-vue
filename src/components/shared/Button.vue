<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    type?: 'button' | 'a' | 'RouterLink';
    stroke?: boolean;
    color?: 'primary' | 'secondary',
    iconAlign?: 'left' | 'right';
    to?: string;
    icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'RouterLink',
    color: 'primary',
    iconAlign: 'right',
    stroke: false,
})

const classes = computed(() => {
    const strokeClass = props.stroke ? 'button--stroke' : '';
    const iconClass = props.icon ? `button--icon button--icon-${props.icon}` : '';
    const iconAlignclass = props.icon ? `button--icon-align-${props.iconAlign}` : '';

    return `button button--${props.color} ${strokeClass} ${iconClass} ${iconAlignclass}`;
})
</script>

<template>
    <component :is="props.type" :to="props.to" :class="classes">
        <slot></slot>
        <vue-feather v-if="icon" :type="icon" size="1.2rem" stroke-width="2.2" class="button__icon"></vue-feather>
    </component>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/functions/rem';

.button {
    $self : &;

    border: none;
    position: relative;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    text-decoration: none;
    flex-shrink: 0;
    height: rem(40px);
    padding: 0 rem(18px);

    border-radius: $border-radius-normal;

    color: $c-black;
    font-weight: bold;

    transition: .1s;

    &__text {
        position: relative;
        z-index: 1;

        &:empty {
            display: none;
        }
    }

    &__icon { }

    &:hover,
    &:focus-within {
        scale: 1.03;
    }

    &:focus {
        scale: .98;
    }

    // color
    &--primary {
        color: $c-black;
        background-color: $c-primary;

        &:hover,
        &:focus-within {
            background-color: $c-primary--light;
        }
    }

    &--secondary {
        color: $c-black;
        background-color: $c-black-10;

        &:hover,
        &:focus-within {
            background-color: $c-white--dark;
        }
    }

    // icon
    &--icon-align-right {}

    &--icon-align-left {
        flex-direction: row-reverse;
    }

    &--icon-twitch {
        #{ $self }__icon {
            margin-top: 3px;
        }
    }
}
</style>
