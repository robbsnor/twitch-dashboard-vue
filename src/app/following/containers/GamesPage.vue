<script setup lang="ts">
import CardGame from '@/app/following/components/CardGame.vue';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import { TitleService } from '../../shared/services/title.service';

TitleService.setTitle('Games');

const favouriteStore = useFavouriteStore();
</script>

<template>
    <Section title="Favourites">
        <template v-if="!favouriteStore.loadingCategories">
            <div
                v-if="favouriteStore.twitchCategories.length"
                class="grid grid-cols-3 gap-5 min-[1000px]:grid-cols-6"
                v-auto-animate
                v-fade-stagger
            >
                <RouterLink v-for="game in favouriteStore.twitchCategories" :key="game.id" :to="`/games/${game.name}`">
                    <CardGame :game="game" />
                </RouterLink>
            </div>

            <Empty v-else icon="mdi-heart" description="No games added to favourite yet"> </Empty>
        </template>

        <Spinner padding v-else />
    </Section>
</template>
