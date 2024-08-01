<script setup lang="ts">
import { TwitchApiService } from '@/app/shared/services/twitch-api.service';
import { onMounted, ref } from 'vue';
import { GamesFactory } from '../factories/games.factory';
import CardLive from '@/app/following/components/CardLive.vue';
import { useRoute } from 'vue-router';

const twitchApiService = new TwitchApiService();
const route = useRoute();

const cards = ref();
const title = ref<string>();

onMounted(async () => {
    const gameSlug = route.params.gameSlug as string;
    const gameRes = await twitchApiService.getGames(gameSlug);
    const { id, name } = gameRes.data.find((game: any) => game.name === gameSlug);
    if (!id) return console.error('Game not found');

    const streamsRes = await twitchApiService.getStreamsByGameId(id);
    title.value = name;
    cards.value = GamesFactory.mapToCardLive(streamsRes.data);
});
</script>

<template>
    <Section :title="title">
        <div class="game">
            <div v-if="cards" class="game__cards" v-auto-animate>
                <div v-for="card in cards" :key="card.userId" class="game__card">
                    <CardLive :card="card" />
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
