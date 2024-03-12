<script setup lang="ts">
import HeaderAvatar from './HeaderAvatar.vue';
import Button from '../../shared/components/Button.vue';
import Logo from '../../shared/components/Logo.vue';

const props = defineProps<{
  user?: any;
}>()
const emit = defineEmits(['clickProfile', 'clickHamburger'])
</script>

<template>
    <header class="header">
        <div class="header__container">
            <div class="header__left">
                <button @click="emit('clickHamburger')" class="header__hamburger hamburger">
                    <span class="sr-only">Menu</span>
                    <div class="hamburger__stroke"></div>
                    <div class="hamburger__stroke"></div>
                </button>
            </div>

            <RouterLink to="/" class="header__logo">
                <Logo />
            </RouterLink>

            <div class="header__right">
                <button @click="emit('clickProfile')" class="header__user">
                    <span class="sr-only">Username</span>
                    <HeaderAvatar
                        v-if="props.user"
                        :image="props.user.profile_image_url"
                    />
                </button>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/functions/rem';
@import '/src/assets/styles/mixins/container';

.header {
    height: $header-height;
    background-image: linear-gradient(180deg, $c-black-1 0%, rgba($c-black-1, 0) 100%);

    &__container {
        @include container();

        display: grid;
        align-items: center;
        grid-template-columns: 1fr 1fr;
        height: 100%;
    }

    &__left {
        display: flex;
        align-items: center;
    }

    &__hamburger {
        padding: rem(20px);
        margin-left: rem(-20px);
    }

    &__logo {
        display: none;
        width: 250px;
    }

    &__right {
        justify-self: end;
    }

    &__user {
        display: flex;
        align-items: center;
        gap: rem(20px);
    }

    &__username {
        display: none;
        font-size: rem(24px);
        color: $c-white;
        font-weight: bold;
    }

    @include screen(1000px) {
        &__container {
            grid-template-columns: 1fr auto 1fr;
        }

        &__username,
        &__logo {
            display: block;
        }
    }
}

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
