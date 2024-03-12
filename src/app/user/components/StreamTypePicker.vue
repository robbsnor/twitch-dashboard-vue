<script setup lang="ts">
import { ref } from 'vue';

const activeType = ref<'highlights' | 'streams' | 'clips'>('highlights');
const amountOfItems = 4;

</script>

<template>
    <div class="stream-type-picker">
        <div class="stream-type-picker__types">
            <h3 @mouseenter="activeType = 'highlights'" class="stream-type-picker__type" :class="{'active' : activeType === 'highlights'}">Highlights</h3>
            <h3 @mouseenter="activeType = 'streams'" class="stream-type-picker__type" :class="{'active' : activeType === 'streams'}">Streams</h3>
            <h3 @mouseenter="activeType = 'clips'" class="stream-type-picker__type" :class="{'active' : activeType === 'clips'}">Clips</h3>
        </div>

        <div class="stream-type-picker__backgrounds">
            <div :class="{'show': activeType === 'highlights'}" class="background background--highlights">
                <vue-feather v-for="index in amountOfItems" type="film" class="background__item"></vue-feather>
            </div>
            <div :class="{'show': activeType === 'streams'}" class="background background--streams">
                <vue-feather v-for="index in amountOfItems" type="play" class="background__item"></vue-feather>
            </div>
            <div :class="{'show': activeType === 'clips'}" class="background background--clips">
                <vue-feather v-for="index in amountOfItems" type="paperclip" class="background__item"></vue-feather>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.stream-type-picker {
    position: relative;
    padding: rem(50px) rem($padding);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: calc(100vh - $header-height);
    overflow: hidden;

    &__types {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    &__type {
        text-align: right;
        font-size: 150px;
        padding-bottom: 0;
        opacity: .3;
        transition: .2s;

        &.active {
            opacity: 1;
        }

        &:nth-child(1) {
            padding-right: 100px;
        }

        &:nth-child(2) {
            padding-right: 50px;
        }
    }

    @include screen($desktop) { }
}

.background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: .3s;
    scale: .98;
    transform: translate(20px, 20px);

    &.show {
        opacity: 1;
        scale: 1;
        transform: translate(0, 0);
    }

    &__item {
        position: absolute;
        color: $c-primary;
        opacity: .2;

        &:nth-child(1) {
            top: rem(120px);
            left: rem(-50px);
            width: rem(350px);
        }

        &:nth-child(2) {
            top: rem(400px);
            left: rem(160px);
            width: rem(260px);
        }

        &:nth-child(3) {
            top: rem(140px);
            right: rem(150px);
            width: rem(260px);
        }

        &:nth-child(4) {
            top: rem(350px);
            right: rem(260px);
            width: rem(200px);
        }
    }
}
</style>
