<script setup lang="ts">
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import Button from '@/app/shared/components/Button.vue';

const props = defineProps<{
    user: TwitchUser;
}>()

</script>

<template>
    <div class="user-drawer">
        <div class="user-drawer__header">
            <div class="user-drawer__header-left">
                <div class="user-drawer__user user">
                    <img :src="props.user.profile_image_url" alt="" class="user__avatar">
                    <div class="user__info">
                        <h4 class="user__name">{{ props.user.display_name }}</h4>
                        <div class="user__followers">132k Followers</div>
                    </div>
                </div>
            </div>

            <div class="user-drawer__header-center">
                <vue-feather type="chevron-down" class="user-drawer__toggle-icon"></vue-feather>
            </div>

            <div class="user-drawer__header-right"><Button>Subscribe</Button></div>
        </div>

        <div class="user-drawer__body"></div>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.user-drawer {
    $self: &;

    @include container;
    transition: .2s;
    background-color: $c-black-4;
    border-radius: rem($border-radius-normal);

    &__header {
        display: flex;
        justify-content: space-between;
        padding: rem($padding) 0;

        &-left {
            display: flex;
            align-items: center;
        }

        &-center {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &-right {
            display: none;
            justify-content: flex-end;
            align-items: center;
        }
    }

    &__toggle-icon {
        transition: .2s;
        color: $c-black-15;
        cursor: pointer;
        padding: rem(10px);
    }

    @include screen($desktop) {

        &__header {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: rem($padding);

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
        width: 50px;
        height: 50px;
        border-radius: 999px;
    }

    &__name {
        font-size: rem(24px);
        padding: 0;
        padding-bottom: rem(3px);
    }

    &__followers {
        font-size: rem(18px);
    }
}
</style>
