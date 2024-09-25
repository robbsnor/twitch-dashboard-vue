<script setup lang="ts">
const props = defineProps<{
    image: string;
    name: string;
}>();
</script>

<template>
    <div class="game-page-header">
        <img class="game-page-header__background-image" :src="props.image" />

        <div class="game-page-header__container">
            <div class="game-page-header__info">
                <img class="game-page-header__image" :src="props.image" alt="game image" />
                <h1 class="game-page-header__title">{{ props.name }}</h1>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.game-page-header {
    position: relative;
    height: 200px;
    overflow: hidden;
    background-color: $c-black-1;

    &__background-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
        filter: blur(50px);
        opacity: .3;
    }

    &__container {
        @include container;

        position: relative;
        display: flex;
        align-items: flex-end;
        height: 100%;
    }

    &__info {
        display: flex;
        align-items: flex-end;
        gap: rem($padding-larger);
        padding-bottom: 30px;
    }

    &__image {
        width: 50px;
        border-radius: $border-radius-normal;
    }

    &__title {
        padding: 0;
        margin: 0;
        font-size: 24px;
    }

    @include screen($desktop) {
        height: 350px;

        &__image {
            width: 100px;
        }

        &__title {
            font-size: 40px;
        }
    }
}
</style>
