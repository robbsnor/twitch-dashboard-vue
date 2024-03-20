<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import Button from '@/app/shared/components/Button.vue';
import ButtonGroup from '@/app/shared/components/ButtonGroup.vue';
import { computed } from 'vue';
import { NumberService } from '@/app/shared/services/number.service';

const props = defineProps<{
    user: TwitchUser;
    isSubscribed: boolean;
    isFollowing: boolean;
    followerAmount: number;
    favourites: number[];
}>()

const drawerIsOpen = ref(false);

const classes = computed(() => {
    const favouriteClass = userIsFavourte.value ? `user-drawer--favourite` : '';
    const drawerIsOpenClass = drawerIsOpen.value ? `open` : '';

    return `user-drawer ${favouriteClass} ${drawerIsOpenClass}`;
})

const formattedFollowerAmount = computed(() => {
    return NumberService.formatThousands(props.followerAmount);
})

const toggleDrawer = () => drawerIsOpen.value = !drawerIsOpen.value;
const closeDrawer = () => drawerIsOpen.value = false;

const userIsFavourte = computed(() => props.favourites.includes(Number(props.user.id)));
</script>

<template>
    <div :class="classes">
        <button @click="closeDrawer" class="user-drawer__background"><span class="sr-only">Close menu</span></button>

        <div class="user-drawer__container">
            <div class="user-drawer__header">
                <div class="user-drawer__header-left">
                    <div class="user-drawer__favourite-indicator"></div>
                    <div class="user-drawer__user user">
                        <a :href="'https://www.twitch.tv/' + props.user.login" target="_blank">
                            <img :src="props.user.profile_image_url" alt="" class="user__avatar">
                        </a>
                        <div class="user__info">
                            <h4 class="user__name">{{ props.user.display_name }}</h4>
                            <div class="user__followers">{{ formattedFollowerAmount }} Followers</div>
                        </div>
                    </div>
                </div>

                <div class="user-drawer__header-center">
                    <vue-feather @click="toggleDrawer" type="chevron-up" class="user-drawer__toggle-icon"></vue-feather>
                </div>

                <div class="user-drawer__header-right">
                    <Button v-if="userIsFavourte" color="secondary"><vue-feather type="heart"></vue-feather></Button>
                    <Button v-else color="primary"><vue-feather type="heart"></vue-feather></Button>
                </div>
            </div>

            <div class="user-drawer__body">
                <div class="uesr-drawer__body-container">
                    <h1>yo</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.user-drawer {
    $self: &;

    position: fixed;
    right: 0;
    bottom: rem($padding);
    left: 0;
    display: flex;
    justify-content: center;
    z-index: 90;

    &__background {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba($c-black-1, .5);
        visibility: hidden;
        opacity: 0;
        transition: .2s;
        z-index: -2;
    }

    &__container {
        @include container(800px);
        border-radius: rem($border-radius-normal);
        overflow: hidden;
    }

    // header
    &__header {
        display: flex;
        justify-content: space-between;
        background-color: $c-black-4;
        padding: rem($padding);
    }

    &__header-left {
        display: flex;
        align-items: center;
    }

    &__header-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__header-right {
        display: none;
        justify-content: flex-end;
        align-items: center;
    }

    &__toggle-icon {
        transition: .2s;
        color: $c-black-15;
        cursor: pointer;
        padding: rem(10px);
    }

    // body
    &__body {
        display: none;
        background-color: $c-black-4;
        padding: 10px 20px;
    }

    // open state
    &.open {
        #{ $self }__background {
            visibility: visible;
            opacity: 1;
        }

        #{ $self }__body {
            display: block;
        }
    }

    @include screen(820px) {
        &__header {
            display: grid;
            grid-template-columns: repeat(3, 1fr);

            &-right {
                display: flex;
            }
        }
    }
}

.user {
    display: flex;
    gap: rem(15px);

    &__avatar {
        width: 40px;
        height: 40px;
        border-radius: 999px;
        // box-shadow:
        //     0px 0px 0px 3px $c-black-4,
        //     0px 0px 0px 6px $c-primary,
        // ;
    }

    &__name {
        font-size: rem(20px);
        line-height: 1;
        padding: 0;
        padding-bottom: rem(5px);
    }

    &__followers {
        font-size: rem(16px);
        line-height: 1;
    }

    @include screen($desktop) {
        &__avatar {
            width: 50px;
            height: 50px;
        }

        &__name {
            font-size: rem(24px);
        }

        &__followers {
            font-size: rem(18px);
        }
    }
}
</style>
