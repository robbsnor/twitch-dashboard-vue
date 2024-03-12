<script setup lang="ts">
import { defineProps } from 'vue';
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import Button from '@/app/shared/components/Button.vue';
import ButtonGroup from '@/app/shared/components/ButtonGroup.vue';

const props = defineProps<{
    user: TwitchUser;
    isSubscribed: boolean;
    isFollowing: boolean;
}>()
</script>

<template>
    <div class="user-drawer">
        <div class="user-drawer__header">
            <div class="user-drawer__header-left">
                <div class="user-drawer__user user">
                    <a :href="'https://www.twitch.tv/' + props.user.login" target="_blank">
                        <img :src="props.user.profile_image_url" alt="" class="user__avatar">
                    </a>
                    <div class="user__info">
                        <h4 class="user__name">{{ props.user.display_name }}</h4>
                        <div class="user__followers">132k Followers</div>
                    </div>
                </div>
            </div>

            <div class="user-drawer__header-center">
                <vue-feather type="chevron-down" class="user-drawer__toggle-icon"></vue-feather>
            </div>

            <div class="user-drawer__header-right">
                <ButtonGroup>
                    <Button v-if="props.isFollowing" color="secondary">Following</Button>
                    <Button v-else>Follow</Button>

                    <Button v-if="props.isSubscribed" color="secondary">Subscribed</Button>
                    <Button v-else>Subscribe</Button>
                </ButtonGroup>
            </div>
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
