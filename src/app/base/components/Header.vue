<script setup lang="ts">
import { ref } from 'vue';
import HeaderAvatar from './HeaderAvatar.vue';

const props = defineProps<{
  user?: any;
}>()

const items = ref(['account', 'settings', 'logout'].map((title) => ({ title })))
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

            <RouterLink to="/following/live" class="header__logo">
                <div class="header-logo header-logo--desktop"><Logo :payoff="true" /></div>
                <div class="header-logo header-logo--mobile"><Logo :payoff="false" /></div>
            </RouterLink>

            <div class="header__right">
                <button class="header__user">
                    <span class="sr-only">Username</span>
                    <HeaderAvatar
                        v-if="props.user"
                        :image="props.user.profile_image_url"
                    />
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item
                                v-for="(item, index) in items"
                                :key="index"
                                :value="index"
                            >
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
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
        grid-template-columns: 1fr auto 1fr;
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

    &__right {
        justify-self: end;
    }

    &__user {
        display: flex;
        align-items: center;
        gap: rem(20px);
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

.header-logo {
    &--desktop {
        display: none;
    }

    &--mobile {
        display: block;
    }

    @include screen($desktop) {
        &--desktop {
            display: block;
        }

        &--mobile {
            display: none;
        }
    }
}
</style>
