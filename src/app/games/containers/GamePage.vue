<script setup lang="ts">
import { TwitchApiService } from "@/app/shared/services/twitch-api.service";
import { computed, onMounted, ref } from "vue";
import { GamesFactory } from "../factories/games.factory";
import { useRoute, useRouter } from "vue-router";
import CardGameStream from "@/app/games/components/CardGameStream.vue";
import type { CardGameStream as CardGameStreamModel } from "@/app/games/models/card-game-stream.model";
import type { TwitchGame } from "../../shared/models/twitch/games.model";
import GamePageHeader from "../components/GamePageHeader.vue";
import { TwitchService } from "@/app/shared/services/twitch.service";

const twitchApiService = new TwitchApiService();
const route = useRoute();
const router = useRouter();

const cards = ref<CardGameStreamModel[]>();
const game = ref<TwitchGame>();

onMounted(async () => {
    const gameName = route.params.gameName as string;
    const res = await twitchApiService.getGames({ names: [gameName] });

    const _game = res.data.find(
        (game) => game.name.toLowerCase() === gameName.toLowerCase()
    );
    if (!_game) return router.push({ name: "home" });

    const streams = await twitchApiService.getStreamsByGameIdWithUsers(
        Number(_game.id)
    );
    game.value = _game;
    cards.value = GamesFactory.mapToCardLive(streams);
});

</script>

<template>
    <template v-if="game">
        <GamePageHeader :image="TwitchService.getGameThumbnail(game.box_art_url)" :name="game.name" />

        <Section>
            <div class="game">
                <div class="game__cards" v-auto-animate>
                    <div
                        v-for="card in cards"
                        :key="card.userId"
                        class="game__card"
                    >
                        <CardGameStream :card="card" />
                    </div>
                </div>
            </div>
        </Section>
    </template>

    <Spinner padding v-else></Spinner>
</template>

<style scoped lang="scss">
.game {
    &__cards {
        display: grid;
        gap: rem(50px) rem($padding-larger);
    }

    @include screen($desktop) {
        &__cards {
            grid-template-columns: repeat(3, 1fr);
        }

        &__card {
            margin-left: 0;
            margin-right: 0;
        }
    }

    @include screen(1200px) {
        &__cards {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @include screen(1500px) {
        &__cards {
            grid-template-columns: repeat(5, 1fr);
        }
    }
}
</style>
