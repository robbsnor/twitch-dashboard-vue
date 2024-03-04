<script setup lang="ts">
interface Props {
    type: 'button' | 'a' | 'RouterLink';
    to?: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'RouterLink',
    to: '/about'
})
</script>

<template>
    <component :is="props.type" :to="props.to" class="button button--primary">
        <slot></slot>
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
    text-decoration: none;
    flex-shrink: 0;
    padding: rem(12px) rem(20px);

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

    // need to do it this way to overwrite feather-icon's styling
    .button__icon {
        position: relative;
        z-index: 1;
        line-height: 1;
        width: 20px;
        height: 20px;
    }

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
        background-color: $c-gray;

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
