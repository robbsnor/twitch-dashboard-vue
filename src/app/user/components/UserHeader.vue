<script setup lang="ts">
import VueFeather from 'vue-feather';
import { NumberService } from '../../shared/services/number.service';

export interface UserHeaderProps {
    username: string;
    banner: string;
    avatar: string;
    followers: number;
    isFavourite: boolean;
};

const props = defineProps<UserHeaderProps>();

const formattedFollowers = () => `${NumberService.formatThousands(props.followers)} Followers`;

</script>

<template>
    <div class="user-header">
        <img :src="props.banner" alt="Lunpia banner" class="user-header__banner">

        <div class="user-header__container">
            <div class="user-header__user">
                <img class="user-header__avatar" :src="props.avatar" alt="Lunpias avatar">
                <div class="user-header__info">
                    <div class="user-header__name">{{ props.username }}</div>
                    <!-- <div class="user-header__followers">{{ formattedFollowers }}</div> -->
                </div>
            </div>

            <vue-feather class="user-header__favourite" type="heart"></vue-feather>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.user-header {
    position: relative;
    display: flex;
    align-items: flex-end;
    height: 200px;
    background-color: $c-black-1;

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
        font-size: rem(18px)
    }

    &__favourite { }
}

// @include screen(1400px) {
//     &__body {
//         grid-template-columns: repeat(5, 1fr);
//     }
// }
</style>
