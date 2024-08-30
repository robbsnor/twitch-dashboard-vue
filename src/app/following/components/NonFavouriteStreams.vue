<script setup lang="ts">
import { useWindowSize, computedAsync } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams-with-user.model";
import CardLive from "../components/CardLive.vue";
import { FollowingFactory } from "../factories/following.factory";
import type { CardLiveSize } from "../models/card-live.model";
import { onStartTyping } from "@vueuse/core";
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


const categories = computedAsync( async() => {
    if (!props.streams) return [];

    const ids = [...new Set(props.streams.map(stream => Number(stream.game_id)))]
    if (!ids.length) return [];

    const info = ids.map(gameId => ({
        ids: gameId,
        amount: props.streams!.filter(stream => Number(stream.game_id) === gameId).length,
    }));

    const { data: resCategories } = await twitchApiService.getGames({ ids: ids });
    if (!resCategories.length) return [];

    const sorted = resCategories.sort((a, b) => a.name.localeCompare(b.name));
    return sorted.map(cat => ({
        title: cat.name,
        value: cat.id,
        props: {
            image: TwitchService.getGameThumbnail(cat.box_art_url, 40),
            amount: info.find(info => info.ids === Number(cat.id))!.amount,
        },
    }));
});

const cardSize = computed(
    (): CardLiveSize => (width.value >= 1000 ? "normal" : "small")
);

const scrollToFilter = () => {
    return;

    const yOffset = -120;
    const y = filterEl.value.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
};

watch(filter, () => {
    if (!filter.value) return;
    scrollToFilter();
});

onStartTyping(() => {
    if (filterEl.value.active) return;
    scrollToFilter();
    filterEl.value.focus();
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
                    ref="filterEl"
                    @update:focused="scrollToFilter"
                >
                    <template #item="{ item }">
                        <!-- TODO: this div should be a v-list-item so the user can use their keyboard -->
                        <div @click="filter = item.title" class="item">
                            <img class="item__image" :src="item.props.image" alt="">
                            <div class="item__name">{{ item.props.title }}</div>
                            <div class="item__amount">({{ item.props.amount }})</div>
                        </div>
                    </template>
                </v-combobox>
            </div>
        </template>

        <div class="non-favourite">
            <div v-if="cards" class="non-favourite__cards" v-auto-animate>
                <div
                    v-for="card in cards"
                    :key="card.userId"
                    class="non-favourite__card"
                >
                    <CardLive
                        :card="card"
                        :size="cardSize"
                        @click:filter-game="filter = $event; scrollToFilter()"
                    />
                </div>
            </div>

            <Spinner padding v-else></Spinner>

            <div
                v-if="!cards?.length && filter?.length"
                class="non-favourite__not-found not-found"
            >
                <p>
                    No streams found matching
                    <span class="not-found__query">"{{ filter }}"</span>.
                </p>
            </div>
        </div>
    </Section>
</template>

<style scoped lang="scss">
.non-favourite {
    // min-height: 80vh;

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
            margin-left: 0;
            margin-right: 0;
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
    &__query {
        display: inline-block;
        color: $c-primary;
    }
}

.item {
    display: flex;
    align-items: center;
    gap: rem(16px);
    padding: rem(8px);
    cursor: pointer;
    transition: 0.1s;

    &:hover {
        background-color: $c-black-8;
    }

    &__image {
        width: rem(40px);
        border-radius: rem(4px);
    }

    &__name {
        font-size: rem(16px);
        font-weight: 500;
    }
}
</style>
