<script setup lang="ts">
import { TwitchApiService } from "@/app/shared/services/twitch-api.service";
import { onMounted, ref } from "vue";
import { GamesFactory } from "../factories/games.factory";
import CardLive from "@/app/following/components/CardLive.vue";
import { useRoute, useRouter } from "vue-router";
import CardGameStream from "@/app/games/components/CardGameStream.vue";

const twitchApiService = new TwitchApiService();
const route = useRoute();
const router = useRouter();

const cards = ref();
const title = ref<string>();

onMounted(async () => {
    const gameName = route.params.gameName as string;
    const res = await twitchApiService.getGames({ names: [gameName] });

    const game = res.data.find(
        (game) => game.name.toLowerCase() === gameName.toLowerCase()
    );
    if (!game) return router.push({ name: "home" });

    const streams = await twitchApiService.getStreamsByGameIdWithUsers(
        Number(game.id)
    );
    title.value = game.name;
    cards.value = GamesFactory.mapToCardLive(streams);
});
</script>

<template>
    <Section :title="title">
        <div class="game">
            <div v-if="cards" class="game__cards" v-auto-animate>
                <div
                    v-for="card in cards"
                    :key="card.userId"
                    class="game__card"
                >
                    <CardGameStream :card="card" />
                </div>
            </div>

            <Spinner padding v-else></Spinner>
        </div>
    </Section>
</template>

<style scoped lang="scss">
.game {
    &__cards {
        display: grid;
        gap: rem($padding-larger);
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
