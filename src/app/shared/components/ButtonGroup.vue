<template>
    <div class="button-group">
        <slot class="xxxxxxxxxxxxd"></slot>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/functions/rem';

.button-group {
    display: inline-flex;
    gap: rem(10px);
}
</style>
