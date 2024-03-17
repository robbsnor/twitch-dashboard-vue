<script setup lang="ts">
import { defineProps } from 'vue';
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

const classes = computed(() => {
    const favouriteClass = userIsFavourte.value ? `user-drawer--favourite` : '';

    return `user-drawer ${favouriteClass}`;
})

const formattedFollowerAmount = computed(() => {
    return NumberService.formatThousands(props.followerAmount);
})

const userIsFavourte = computed(() => props.favourites.includes(Number(props.user.id)));
</script>

<template>
    <div :class="classes">
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
                    <vue-feather type="chevron-up" class="user-drawer__toggle-icon"></vue-feather>
                </div>

                <div class="user-drawer__header-right">
                    <ButtonGroup>
                        <Button v-if="props.isFollowing" color="secondary">Unfollow</Button>
                        <Button v-else>Follow</Button>

                        <Button v-if="props.isSubscribed" color="secondary">Unsubscribe</Button>
                        <Button v-else>Subscribe</Button>
                    </ButtonGroup>
                </div>
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

    position: fixed;
    right: 0;
    bottom: rem($padding);
    left: 0;
    display: flex;
    justify-content: center;
    z-index: 9;

    &__container {
        @include container;
        position: relative;
        transition: .2s;
        background-color: $c-black-4;
        border-radius: rem($border-radius-normal);
        z-index: 11;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        padding: rem(10px) 0;
    }

    &__favourite-indicator {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: rem(500px);
        border-radius: rem($border-radius-normal);
        background: linear-gradient(165deg, rgba($c-primary, .4) 0%, rgba($c-primary, 0) 50%);
        z-index: -1;
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

    &--favourite {
        #{ $self }__favourite-indicator {
            display: block;
        }
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
