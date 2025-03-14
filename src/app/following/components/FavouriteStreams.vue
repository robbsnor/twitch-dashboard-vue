<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams-with-user.model";
import CardLiveFancy from "../components/CardLiveFancy.vue";
import { FollowingFactory } from "../factories/following.factory";
import StreamFilter from "./StreamFilter.vue";

const filter = defineModel<string>("filter");

const props = defineProps<{
    streams?: TwitchFollowedStreamWithUser[];
    categories?: string[];
}>();

const cards = computed(() => {
    if (!props.streams) return;
    return FollowingFactory.mapToCardLiveFancy(props.streams);
});
</script>

<template>
    <div class="top">
        <StreamFilter v-model:filter="filter" :categories="props.categories" />
    </div>

    <Section title="Favourites">
        <template #backgroundArt>
            <Swirl v-if="streams?.length" class="swirl"></Swirl>
        </template>

        <template #actions>
            <StreamFilter class="filter" v-model:filter="filter" :categories="props.categories" />
        </template>

        <div class="favourites">
            <div v-if="cards?.length" class="favourites__cards" v-fade-stagger="{ delay: 100 }">
                <div
                    v-for="card in cards"
                    :key="card.userId"
                    class="favourites__card"
                    v-auto-animate
                >
                    <CardLiveFancy :card="card" v-model:filter="filter"/>
                </div>
            </div>

            <p v-else>No favourite streamers online.</p>
        </div>
    </Section>
</template>

<style scoped lang="scss">
.top {
    @include container();

    @include screen($desktop) {
        display: none;
    }
}

.filter {
    display: none;

    @include screen($desktop) {
        display: block;
    }
}

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
