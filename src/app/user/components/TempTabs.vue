<template>
    <div class="temp-tabs">
            <div class="temp-tabs__tab temp-tabs__tab--active">Videos</div>
            <div class="temp-tabs__tab">Schedule</div>
            <div class="temp-tabs__tab">About</div>
        </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.temp-tabs {
    display: flex;
    gap: rem(30px);
    padding: rem(20px) 0;

    &__tab {
        color: $c-black-10;
        font-size: rem(24px);
        font-weight: bold;
        cursor: pointer;

        &--active {
            color: $c-white;
        }
    }
}
</style>
