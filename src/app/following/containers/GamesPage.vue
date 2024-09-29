<script setup lang="ts">
import { GamesFactory } from "@/app/games/factories/games.factory";
import { TwitchApiService } from "@/app/shared/services/twitch-api.service";
import { useFavouriteStore } from "@/app/shared/stores/favourites.store";
import { onMounted, ref } from "vue";
import { TitleService } from "../../shared/services/title.service";
import type { CardGameModel } from "../components/CardGame.vue";
import CardGame from "@/app/following/components/CardGame.vue";

const twitchApiService = new TwitchApiService();

TitleService.setTitle("Games");

const favouriteStore = useFavouriteStore();

const favCards = ref<CardGameModel[]>();

const getFavouriteCards = async () => {
    const res = await twitchApiService.getGames({
        names: favouriteStore.favouriteCategories,
    });

    favCards.value = GamesFactory.mapToCardGame(res.data);
};

onMounted(() => {
    getFavouriteCards();
});
</script>

<template>
    <Section title="Favourites">
        <div class="fav-games">
            <div v-if="favCards" class="fav-games__cards" v-auto-animate v-fade-stagger>
                <RouterLink
                    class="fav-games__card"
                    v-for="card in favCards"
                    :key="card.thumbnail"
                    :to="`/games/${card.name}`"
                >
                    <CardGame :card="card" />
                </RouterLink>
            </div>

            <Spinner padding v-else />
        </div>
    </Section>
</template>

<style scoped lang="scss">
.fav-games {
    &__cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: rem($padding);
    }

    @include screen($desktop) {
        &__cards {
            grid-template-columns: repeat(6, 1fr);
        }
    }
}

.fav-game-card {
    border-radius: 20px;
    overflow: hidden;
}
</style>
