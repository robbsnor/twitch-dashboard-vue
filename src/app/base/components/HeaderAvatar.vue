<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  image: string;
}>()
</script>

<template>
    <div class="header-avatar">
        <img :src="props.image" alt="" class="header-avatar__image">
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/functions/rem';

.header-avatar {
    position: relative;
    width: rem(30px);
    height: rem(30px);

    &:after {
        content: '';
        position: absolute;
        top: -4px;
        right: -4px;
        bottom: -4px;
        left: -4px;
        border: 2px solid $c-primary;
        border-radius: 999px;
    }

    &__image {
        border-radius: 999px;
    }
}
</style>
