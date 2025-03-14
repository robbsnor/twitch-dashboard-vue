<script setup lang="ts">
import { computedAsync } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams-with-user.model";
import CardLiveSmall from "../components/CardLiveSmall.vue";
import CardLiveNormal from "../components/CardLiveNormal.vue";
import { FollowingFactory } from "../factories/following.factory";

const props = defineProps<{
    streams: TwitchFollowedStreamWithUser[];
}>();

const filter = defineModel<string>("filter");
const sectionEl = ref<HTMLElement | any>();

const cards = computed(() => {
    return FollowingFactory.mapToCardLiveNormal(props.streams);
});
</script>

<template>
    <Section title="Live channels" ref="sectionEl">
        <div class="non-favourite">
            <div v-if="cards" class="non-favourite__cards" v-fade-stagger v-auto-animate>
                <template v-for="card in cards" :key="card.userId">
                    <div class="non-favourite__card-small">
                        <CardLiveSmall
                            :card="card"
                            v-model:filter="filter"
                        />
                    </div>

                    <div class="non-favourite__card-normal">
                        <CardLiveNormal
                            :card="card"
                            v-model:filter="filter"
                        />
                    </div>
                </template>
            </div>

            <Spinner padding v-else></Spinner>

            <Empty v-if="!cards?.length && !!filter" icon="mdi-movie-search-outline">
                <div class="not-found">
                    No streams found for: <span class="not-found__query">"{{ filter }}"</span>.
                </div>
            </Empty>
        </div>
    </Section>
</template>

<style scoped lang="scss">
.non-favourite {
    &__cards {
        display: grid;
        margin-left: rem(-$padding);
        margin-right: rem(-$padding);
        overflow: hidden;
    }

    &__card-normal {
        display: none;
    }

    @include screen($desktop) {
        &__cards {
            grid-template-columns: repeat(3, 1fr);
            gap: rem(50px) rem($padding-larger);
            margin-left: -50px;
            margin-right: -50px;
            padding-left: 50px;
            padding-right: 50px;
        }

        &__card-small {
            display: none;
        }

        &__card-normal {
            display: block;
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

.filter {
    display: flex;
    align-items: center;
    gap: rem(8px);
    width: 100%;
    min-width: rem(336px);
}

.not-found {
    color: $c-text-base;

    &__query {
        display: inline-block;
        color: $c-primary;
    }
}

.item {
    display: flex;
    align-items: center;
    padding: rem(8px);
    cursor: pointer;
    transition: 0.1s;

    &__image {
        width: rem(30px);
        margin-right: rem(10px);
        border-radius: rem(4px);
    }

    &__name {
        font-size: rem(16px);
        font-weight: 500;
    }

    &__amount {
        font-size: rem(12px);
        color: $c-black-20;
        margin-left: rem(8px);
    }

    &:hover {
        background-color: $c-black-8;
    }
}
</style>
