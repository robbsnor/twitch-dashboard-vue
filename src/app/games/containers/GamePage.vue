<script setup lang="ts">
import { TwitchApiService } from '@/app/shared/services/twitch-api.service';
import { onMounted, ref } from 'vue';
import { GamesFactory } from '../factories/games.factory';
import CardLive from '@/app/following/components/CardLive.vue';

const twitchApiService = new TwitchApiService();
const BLACK_OPS_ID = 23894;

const cards = ref();

onMounted(async () => {
    const res = await twitchApiService.getStreamsByGame(BLACK_OPS_ID);
    console.log(res);
    cards.value = GamesFactory.mapToCardLive(res.data);



});
</script>

<template>
    <Section title="Black ops">
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
    min-height: 80vh;

    &__cards {
        display: grid;
        margin-left: rem(-$padding);
        margin-right: rem(-$padding);
    }

    @include screen($desktop) {
        &__cards {
            grid-template-columns: repeat(3, 1fr);
            gap: rem(50px) rem($padding-larger);
            margin-left: 0;
            margin-right: 0;
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
