<template>
    <div class="button-group">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.button-group {
    display: inline-flex;
    gap: rem(10px);
}
</style>
