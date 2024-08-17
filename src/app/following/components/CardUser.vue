<script setup lang="ts">
import { computed } from "vue";

export interface CardUserProps {
    name: string;
    avatar: string;
    backgroundImage?: string;
}

const props = defineProps<CardUserProps>();

const link = computed(() => `/user/${props.name}`);
</script>

<template>
    <RouterLink :to="link" class="card-user">
        <img :src="props.avatar" alt="User image" class="card-user__avatar" />
        <h3 class="card-user__name">{{ name }}</h3>
        <img :src="props.backgroundImage" alt="User offline image" class="card-user__background-image"/>
    </RouterLink>
</template>

<style scoped lang="scss">
.card-user {
    $self: &;

    // background-color: $c-black-3;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: rem(10px);
    border-radius: $border-radius-normal;
    justify-content: center;
    align-items: center;
    padding: rem(20px);
    overflow: hidden;
    transition: 0.2s;
    z-index: 1;

    &__avatar {
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

    &__background-image {
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: 0.2s;
        opacity: .1;
        z-index: -1;
    }

    &:hover {
        background-color: $c-primary;

        #{ $self }__avatar {
            transform: scale(1.1) translateY(rem(-3px));
        }

        #{ $self }__name {
            color: $c-black-1;
        }
    }
}
</style>
