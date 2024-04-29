<script setup lang="ts">
import { computed } from 'vue';

export interface CardUserProps {
    name: string;
    image: string;
}

const props = defineProps<CardUserProps>();

const link = computed(() => `/user/${props.name}`);
</script>

<template>
    <RouterLink :to="link" class="card-user">
        <img :src="image" alt="User image" class="card-user__image" />
        <h3 class="card-user__name">{{ name }}</h3>
    </RouterLink>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.card-user {
    background-color: $c-black-3;
    display: flex;
    flex-direction: column;
    gap: rem(10px);
    border-radius: $border-radius-normal;
    justify-content: center;
    align-items: center;
    padding: rem(20px);
    transition: .2s;

    &__image {
        border-radius: 999px;
        width: 60px;
        height: 60px;
    }

    &__name {
        margin: 0;
        padding: 0;
        font-size: rem(20px);
    }

    &:hover {
        background-color: $c-black-2;
    }
}
</style>
