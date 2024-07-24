<script setup lang="ts">
import VueFeather from 'vue-feather';
import { NumberService } from '../../shared/services/number.service';
import { computed } from 'vue';

export interface UserHeaderProps {
    username: string;
    banner: string;
    avatar: string;
    followers: number;
    isFavourite: boolean;
};

const props = defineProps<UserHeaderProps>();

const formattedFollowers = computed(() => `${NumberService.abbreviateNumber(props.followers)} Followers`);
</script>

<template>
    <div class="user-header">
        <v-img :src="props.banner" :alt="`${props.username}'s banner`" class="user-header__banner" />

        <div class="user-header__container">
            <div class="user-header__user">
                <v-img class="user-header__avatar" :src="props.avatar" :alt="`${props.username}'s avatar`" />
                <div class="user-header__info">
                    <a class="user-header__name" :href="`https://www.twitch.tv/${props.username}/videos?filter=all&sort=time`" target="_blank">{{ props.username }}</a>
                    <div class="user-header__followers">{{ formattedFollowers }}</div>
                </div>
            </div>

            <button class="user-header__favourite">
                <vue-feather type="heart" />
            </button>
        </div>

        <div class="user-header__fade"></div>
    </div>
</template>

<style scoped lang="scss">
.user-header {
    position: relative;
    display: flex;
    align-items: flex-end;
    height: 200px;
    background-color: $c-black-1;
    transition: .2s;

    &__banner {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: .4;
        object-fit: cover;
    }

    &__container {
        @include container;

        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: rem($padding);
        padding-bottom: rem($padding);
        z-index: 1;
    }

    &__user {
        display: flex;
        gap: rem(16px);
    }

    &__avatar {
        border-radius: 999px;
        width: rem(50px);
        height: rem(50px);
    }

    &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: rem(4px);
    }

    &__name {
        font-size: rem(28px);
        font-weight: bold;
        color: $c-white;
    }

    &__followers {
        font-size: rem(18px);
        color: $c-black-20;
    }

    &__favourite {
        padding: rem(16px) 0;
    }

    &__fade {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 120px;
        background-image: linear-gradient(to top, rgba($c-black-1, .7), rgba($c-black-1, 0));
    }

    @include screen($desktop) {
        height: 300px;
    }
}
</style>
