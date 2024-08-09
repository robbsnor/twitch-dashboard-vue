<script setup lang="ts">
export interface CardGameModel {
    thumbnail: string;
    name: string;
}

const props = defineProps<{ card: CardGameModel }>();
</script>

<template>
    <div class="card-game">
        <img :src="props.card.thumbnail" alt="" class="card-game__image" />
    </div>
</template>

<style lang="scss" scoped>
.card-game {
    $self: &;

    border-radius: rem($border-radius-large);
    overflow: hidden;
    transition: 0.2s;

    &__image {
        width: 100%;
        opacity: 0.8;
        transition: 0.2s;
    }

    &:hover {
        scale: 1.05;

        #{ $self }__image {
            opacity: 1;
        }
    }
}
</style>
