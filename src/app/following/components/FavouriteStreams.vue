<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams-with-user.model";
import CardLiveFancy from "../components/CardLiveFancy.vue";
import { FollowingFactory } from "../factories/following.factory";

const filter = defineModel<string>("filter");

const props = defineProps<{
    streams?: TwitchFollowedStreamWithUser[];
    categories?: string[];
}>();

const filterEl = ref<HTMLDivElement | any>();

const cards = computed(() => {
    if (!props.streams) return;
    return FollowingFactory.mapToCardLiveFancy(props.streams);
});

const scrollToFilter = () => {
    const yOffset = -120;
    const y = filterEl.value.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
};

watch(filter, () => {
    if (!filter.value) return;
    scrollToFilter();
});
</script>

<template>
    <Section title="Favourites">
        <template #backgroundArt>
            <Swirl v-if="streams?.length" class="swirl"></Swirl>
        </template>

        <template #actions>
            <div class="filter">
                <v-combobox
                    class="filter__search"
                    v-model="filter"
                    :items="props.categories"
                    placeholder="Search streams..."
                    @click="scrollToFilter"
                    persistent-clear
                    eager
                    ref="filterEl"
                />
            </div>
        </template>

        <div class="favourites">
            <div v-if="cards?.length" class="favourites__cards" v-fade-stagger="{ delay: 100 }">
                <div
                    v-for="card in cards"
                    :key="card.userId"
                    class="favourites__card"
                    v-auto-animate
                >
                    <CardLiveFancy :card="card" />
                </div>
            </div>

            <p v-else>No favourite streamers online.</p>
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
