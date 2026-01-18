<script setup lang="ts">
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import { computed } from 'vue';

const props = defineProps<{
    user: TwitchUser;
}>();
const link = computed(() => `/user/${props.user.login}`);
</script>

<template>
    <RouterLink :to="link" class="card-user">
        <img
            :src="props.user.profile_image_url"
            :alt="`${props.user.display_name}'s avatar`"
            class="card-user__avatar"
        />
        <h3 class="card-user__name">{{ props.user.display_name }}</h3>
    </RouterLink>

    <RouterLink :to="link" class="card-user-large">
        <img
            :src="props.user.profile_image_url"
            :alt="`${props.user.display_name}'s avatar`"
            class="card-user-large__avatar"
        />
        <h3 class="card-user-large__name">{{ props.user.display_name }}</h3>
    </RouterLink>
</template>

<style scoped lang="scss">
.card-user {
    $self: &;

    background-color: $c-black-3;
    position: relative;
    display: flex;
    gap: rem(10px);
    border-radius: $border-radius-normal;
    align-items: center;
    padding: rem(12px);
    overflow: hidden;
    transition: 0.2s;
    z-index: 1;

    &__avatar {
        border-radius: 999px;
        width: 40px;
        height: 40px;
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
        opacity: 0.1;
        z-index: -1;
    }

    &:hover {
        background-color: $c-primary;

        #{ $self }__avatar {
            transform: scale(1.1);
        }

        #{ $self }__name {
            color: $c-black-1;
        }

        #{ $self }__background-image {
            opacity: 0;
        }
    }

    @include screen($desktop) {
        display: none;
    }
}

.card-user-large {
    $self: &;

    background-color: $c-black-3;
    position: relative;
    display: none;
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
        opacity: 0.1;
        z-index: -1;
    }

    &:hover {
        background-color: $c-primary;

        #{ $self }__avatar {
            transform: scale(1.1);
        }

        #{ $self }__name {
            color: $c-black-1;
        }

        #{ $self }__background-image {
            opacity: 0;
        }
    }

    @include screen($desktop) {
        display: flex;
    }
}
</style>
