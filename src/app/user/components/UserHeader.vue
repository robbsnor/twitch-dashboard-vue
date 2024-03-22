<script setup lang="ts">
import VueFeather from 'vue-feather';

</script>

<template>
    <div class="user-header">
        <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/340bf118-4558-4d0a-8285-166043494a37-profile_banner-480.jpeg" alt="Lunpia banner" class="user-header__banner">

        <div class="user-header__container">
            <div class="user-header__user">
                <img class="user-header__avatar" src="https://static-cdn.jtvnw.net/jtv_user_pictures/4f4492fe-37a0-4fa9-aacc-5e148b1a3735-profile_image-70x70.jpeg" alt="Lunpias avatar">
                <div class="user-header__info">
                    <div class="user-header__name">Lunpia</div>
                    <div class="user-header__followers">132K Followers</div>
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
    padding-top: 250px;
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
