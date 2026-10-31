<script setup lang="ts">
import CardGameStream from '@/app/games/components/CardGameStream.vue';
import { useTwitchApi } from '@/app/shared/composables/useTwitchApi.composable';
import type { TwitchStreamsWithUser } from '@/app/shared/models/twitch/streams-with-user.model';
import { TwitchService } from '@/app/shared/services/twitch.service';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { TwitchGame } from '../../shared/models/twitch/games.model';
import GamePageHeader from '../components/GamePageHeader.vue';

const route = useRoute();
const twitchApi = useTwitchApi();

const streams = ref<TwitchStreamsWithUser[]>();
const game = ref<TwitchGame | null>();

onMounted(async () => {
    const gameName = route.params.gameName as string;
    const games = await twitchApi.getGames({ names: [gameName] });

    game.value = games.find((game) => game.name.toLowerCase() === gameName.toLowerCase());
    if (!game.value) return;

    streams.value = await twitchApi.getStreamsWithUser({ gameIds: [game.value.id] });
});
</script>

<template>
    <template v-if="game">
        <GamePageHeader
            class="game-header"
            :image="TwitchService.getGameThumbnail(game.box_art_url)"
            :name="game.name"
            :id="game.id"
        />

        <Section>
            <div class="game">
                <Empty v-if="!streams?.length" title="No streamers atm..." description="Come back later"></Empty>

                <div class="game__cards" v-auto-animate v-fade-stagger>
                    <div v-for="stream in streams" :key="stream.id" class="game__card">
                        <CardGameStream :stream="stream" />
                    </div>
                </div>
            </div>
        </Section>
    </template>

    <Spinner v-if="game === undefined" padding></Spinner>

    <Empty
        v-if="game === null"
        :title="`Game not found:  ${route.params.gameName} `"
        description="Try something else"
    />
</template>

<style scoped lang="scss">
.game-header {
    margin-top: -$header-height;
}

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
