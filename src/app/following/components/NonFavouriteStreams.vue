<script setup lang="ts">
import { useWindowSize, computedAsync } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams-with-user.model";
import CardLive from "../components/CardLive.vue";
import { FollowingFactory } from "../factories/following.factory";
import type { CardLiveSize } from "../models/card-live.model";
import { TwitchApiService } from "@/app/shared/services/twitch-api.service";
import { TwitchService } from "@/app/shared/services/twitch.service";

const twitchApiService = new TwitchApiService();

const props = defineProps<{
    streams?: TwitchFollowedStreamWithUser[];
}>();

const filter = defineModel<string>("filter");

const { width } = useWindowSize();
const filterEl = ref<HTMLDivElement | any>();
const sectionEl = ref<HTMLElement | any>();

const cards = computed(() => {
    const videos = props.streams?.filter((stream) => {
        if (!filter.value) return true;

        const usernameMatch = stream.user_name
            .toLowerCase()
            .includes(filter.value.toLowerCase());
        const gameMatch = stream.game_name
            ?.toLowerCase()
            .includes(filter.value.toLowerCase());
        const titleMatch = stream.title
            .toLowerCase()
            .includes(filter.value.toLowerCase());

            return usernameMatch || gameMatch || titleMatch;
    });
    if (!videos) return;

    return FollowingFactory.mapToCardLiveNormal(videos);
});

const categories = computedAsync(async () => {
    if (!props.streams) return [];

    return [...new Set(props.streams.map(stream => stream.game_name))].sort().filter(Boolean);
    // for custom dropdown element
//     const ids = [...new Set(props.streams.map(stream => Number(stream.game_id)))];
//     if (!ids.length) return [];
//
//     const info = ids.map(gameId => ({
//         ids: gameId,
//         amount: props.streams!.filter(stream => Number(stream.game_id) === gameId).length,
//     }));
//
//     const { data: resCategories } = await twitchApiService.getGames({ ids: ids });
//     if (!resCategories.length) return [];
//
//     const sorted = resCategories.sort((a, b) => a.name.localeCompare(b.name));
//     return sorted.map(cat => ({
//         title: cat.name,
//         value: cat.id,
//         props: {
//             image: TwitchService.getGameThumbnail(cat.box_art_url, 50),
//             amount: info.find(info => info.ids === Number(cat.id))!.amount,
//         },
//     }));
});

const cardSize = computed(
    (): CardLiveSize => (width.value >= 1000 ? "normal" : "small")
);

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
    <Section title="Live channels" ref="sectionEl">
        <template #actions>
            <div class="filter">
                <v-combobox
                    class="filter__search"
                    v-model="filter"
                    :items="categories"
                    placeholder="Search streams..."
                    persistent-clear
                    eager
                    ref="filterEl"
                >
                    <!-- <template #item="{ item }"> -->
                        <!-- TODO: this div should be a v-list-item so the user can use their keyboard -->
                        <!-- <div @click="filter = item.title" class="item">
                            <img class="item__image" :src="item.props.image" :alt="`${item.props.title}'s thumbnail`">
                            <div class="item__name">{{ item.props.title }}</div>
                            <div class="item__amount"> / {{ item.props.amount }}</div>
                        </div>
                    </template> -->
                </v-combobox>
            </div>
        </template>

        <div class="non-favourite">
            <div v-if="cards" class="non-favourite__cards" v-fade-stagger v-auto-animate>
                <div
                    v-for="card in cards"
                    :key="card.userId"
                    class="non-favourite__card"
                >
                    <CardLive
                        :card="card"
                        :size="cardSize"
                        v-model:filter="filter"
                    />
                </div>
            </div>

            <Spinner padding v-else></Spinner>

            <Empty v-if="!cards?.length && !!filter">
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

    @include screen($desktop) {
        &__cards {
            grid-template-columns: repeat(3, 1fr);
            gap: rem(50px) rem($padding-larger);
            margin-left: -50px;
            margin-right: -50px;
            padding-left: 50px;
            padding-right: 50px;
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

.filter {
    display: flex;
    align-items: center;
    gap: rem(8px);
    width: 100%;
    min-width: rem(336px);
}

.not-found {
    color: $c-black-14;

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
