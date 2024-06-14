<script setup lang="ts">
import { computed } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams.model';
import CardLive from '../components/CardLive.vue';
import { LiveFactory } from '../factories/live.factory';

const props = defineProps<{
    streams?: TwitchFollowedStreamWithUser[];
}>();

const cards = computed(() => {
    if (!props.streams) return;
    return LiveFactory.mapToCardLiveFancy(props.streams);
});
</script>

<template>
    <Section title="Favourites">
        <template #background-art>
            <Swirl v-if="streams?.length"class="swirl"></Swirl>
        </template>
        <div class="favourites">
            <div v-if="cards?.length" class="favourites__cards">
                <div v-for="card in cards" :key="card.userId" class="favourites__card" v-auto-animate>
                    <CardLive :card="card" size="fancy"></CardLive>
                </div>
            </div>
            <div v-else>No favourites online</div>
        </div>
    </Section>
</template>

<style scoped lang="scss">
.favourites-swirl {
    position: absolute;
    top: 330px;
    left: 50%;
    min-width: $container-default-width;
    transform: translateX(-50%);

    @include screen($desktop) {
        top: 200px;
    }
}

.favourites {
    &__cards {
        display: grid;
        gap: rem(50px);
    }

    &__card {
        width: 100%;
    }

    @include screen(800px) {
        &__cards {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @include screen(1200px) {
        &__cards {
            grid-template-columns: repeat(3, 1fr);
        }

        &__card {
            &:nth-child(3n - 1) {
                margin-top: rem(50px);
            }
        }
    }
}
</style>
