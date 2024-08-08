<script setup lang="ts">
import { computed } from "vue";

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
.card-user {
    $self: &;

    background-color: $c-black-3;
    display: flex;
    flex-direction: column;
    gap: rem(10px);
    border-radius: $border-radius-normal;
    justify-content: center;
    align-items: center;
    padding: rem(20px);
    transition: 0.2s;

    &__image {
        border-radius: 999px;
        width: 60px;
        height: 60px;
        transition: 0.2s;
    }

    &__name {
        margin: 0;
        padding: 0;
        font-size: rem(20px);
        transition: 0.2s;
    }

    &:hover {
        background-color: $c-primary;

        #{ $self }__image {
            transform: scale(1.1) translateY(rem(-3px));
        }

        #{ $self }__name {
            color: $c-black-1;
        }
    }
}
</style>
