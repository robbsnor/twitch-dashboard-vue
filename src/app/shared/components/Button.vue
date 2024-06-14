<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    color?: 'primary' | 'secondary',
    iconAlign?: 'left' | 'right';
    icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
    color: 'primary',
    iconAlign: 'right',
});

const classes = computed(() => {
    const iconClass = props.icon ? `button--icon button--icon-${props.icon}` : '';
    const iconAlignclass = props.icon ? `button--icon-align-${props.iconAlign}` : '';

    return `button button--${props.color} ${iconAlignclass} ${iconClass}`;
});
</script>

<template>
    <button :class="classes">
        <slot></slot>
        <vue-feather v-if="icon" :type="icon" size="1.2rem" stroke-width="2.2" class="button__icon"></vue-feather>
    </button>
</template>

<style scoped lang="scss">
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

    color: $c-black-1;
    font-weight: bold;

    transition: .1s;

    &__text {
        position: relative;
        z-index: 1;

        &:empty {
            display: none;
        }
    }

    &__icon {}

    &:hover {
        // scale: 1.04;
    }

    &:focus {
        // scale: .96;
    }

    // color
    &--primary {
        color: $c-black-1;
        background-color: $c-primary;

        &:hover {
            background-color: $c-primary--lighter;
        }
    }

    &--secondary {
        color: $c-black-1;
        background-color: $c-black-10;

        &:hover {
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
