<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    menuOpen: boolean;
}>();

const cssClass = computed(() => {
    return {
        'hamburger': true,
        'is-open': props.menuOpen,
    };
});

</script>

<template>
    <button :class="cssClass">
        <span class="sr-only">Menu</span>
        <div class="hamburger__stroke"></div>
        <div class="hamburger__stroke"></div>
    </button>
</template>


<style scoped lang="scss">
.hamburger {
    $self: &;

    &__stroke {
        height: 2px;
        width: rem(17px);
        background-color: $c-white;
        transition: transform .1s cubic-bezier(0.25, 0, 0.75, 1.3);

        &:first-of-type {
            width: rem(25px);
            margin-bottom: rem(5px);
        }
    }

    &:hover {
        #{ $self }__stroke {

            &:first-of-type {
                transform: translateX(rem(2px));
            }

            &:last-of-type {
                transform: translateX(rem(-2px));
            }
        }
    }

    &.is-open {
        #{ $self }__stroke {
            width: rem(25px);

            &:first-of-type {
                transform: rotate(-45deg);
                margin-bottom: rem(-2px);
            }

            &:last-of-type {
                transform: rotate(45deg);
            }
        }
    }
}
</style>
