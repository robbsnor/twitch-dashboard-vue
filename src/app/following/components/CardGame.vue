<script setup lang="ts">
import type { TwitchGame } from '@/app/shared/models/twitch/games.model';
import { TwitchService } from '@/app/shared/services/twitch.service';

const props = defineProps<{ game: TwitchGame }>();
</script>

<template>
    <div class="card-game">
        <img :src="TwitchService.getGameThumbnail(props.game.box_art_url)" alt="" class="card-game__image" />
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
