<script setup lang="ts">
</script>

<template>
    <div class="empty">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: rem($padding-larger);
    border-radius: rem($border-radius-normal);
}
</style>
