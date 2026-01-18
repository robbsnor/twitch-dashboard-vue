<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CardGameStream from '@/app/games/components/CardGameStream.vue';
import type { CardGameStream as CardGameStreamModel } from '@/app/games/models/card-game-stream.model';
import type { TwitchGame } from '../../shared/models/twitch/games.model';
import GamePageHeader from '../components/GamePageHeader.vue';
import { TwitchService } from '@/app/shared/services/twitch.service';
import { useTwitchApi } from '@/app/shared/composables/useTwitchApi.composable';
import type { TwitchStreamsWithUser } from '@/app/shared/models/twitch/streams-with-user.model';

const route = useRoute();
const router = useRouter();
const twitchApi = useTwitchApi();

const streams = ref<TwitchStreamsWithUser[]>();
const game = ref<TwitchGame | null>();

onMounted(async () => {
    const gameName = route.params.gameName as string;
    const res = await twitchApi.getGames({ names: [gameName] });

    const _game = res.data.find((game) => game.name.toLowerCase() === gameName.toLowerCase());
    if (!_game) return (game.value = null);

    streams.value = await twitchApi.getStreamsByGameIdWithUsers(Number(_game.id));
    game.value = _game;
});
</script>

<template>
    <template v-if="game">
        <GamePageHeader
            class="game-header"
            :image="TwitchService.getGameThumbnail(game.box_art_url)"
            :name="game.name"
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
