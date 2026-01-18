<script setup lang="ts">
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import { onMounted, ref } from 'vue';
import { TitleService } from '../../shared/services/title.service';
import CardGame from '@/app/following/components/CardGame.vue';
import { useTwitchApi } from '@/app/shared/composables/useTwitchApi.composable';
import type { TwitchGame } from '@/app/shared/models/twitch/games.model';

TitleService.setTitle('Games');

const favouriteStore = useFavouriteStore();
const twitchApi = useTwitchApi();
const games = ref<TwitchGame[]>();

const getFavouriteCards = async () => {
    const res = await twitchApi.getGames({
        names: favouriteStore.categories,
    });

    games.value = res.data;
};

onMounted(() => {
    getFavouriteCards();
});
</script>

<template>
    <Section title="Favourites">
        <div class="fav-games">
            <div v-if="games" class="fav-games__cards" v-auto-animate v-fade-stagger>
                <RouterLink class="fav-games__card" v-for="game in games" :key="game.id" :to="`/games/${game.name}`">
                    <CardGame :game="game" />
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
