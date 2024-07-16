<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { computed, ref } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams.model';
import CardLive from '../components/CardLive.vue';
import { FollowingFactory } from '../factories/following.factory';
import type { CardLiveSize } from '../models/card-live.model';

const { width } = useWindowSize();

const props = defineProps<{
    streams?: TwitchFollowedStreamWithUser[];
    filter: string;
}>();

const filter = defineModel<string>('filter');
const sectionEl = ref<HTMLElement | null>(null);

const cards = computed(() => {
    const videos = props.streams?.filter(stream => {
        if (!filter.value) return true;

        const usernameMatch = stream.user_name.toLowerCase().includes(filter.value.toLowerCase());
        const gameMatch = stream.game_name?.toLowerCase().includes(filter.value.toLowerCase());
        const titleMatch = stream.title.toLowerCase().includes(filter.value.toLowerCase());

        return usernameMatch || gameMatch || titleMatch;
    });
    if (!videos) return;

    return FollowingFactory.mapToCardLiveNormal(videos);
});

const categories = computed(() => {
    const duplicateCategories = props.streams?.map(stream => stream.game_name).sort().filter(Boolean);
    return [...new Set(duplicateCategories)];
});

const cardSize = computed((): CardLiveSize => width.value >= 1000 ? 'normal' : 'small');

const setSearchToTopOfPage = (focused: boolean) => {
    if (!focused) return;

    const isMobile = width.value <= 1000;
    if (!isMobile) return;

    const el = document.querySelector('.filter__search')!;
    const yOffset = -120;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
};
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
                    @update:focused="setSearchToTopOfPage($event)"
                />
            </div>
        </template>

        <div class="non-favourite">
            <div v-if="cards" class="non-favourite__cards" v-auto-animate>
                <div v-for="card in cards" :key="card.userId" class="non-favourite__card">
                    <CardLive :card="card" :size="cardSize" @click:game="filter = $event; setSearchToTopOfPage(true)" />
                </div>
            </div>

            <Spinner padding v-else></Spinner>

            <div v-if="!cards?.length && filter?.length" class="non-favourite__not-found not-found">
                <p>No streams found matching <span class="not-found__query">"{{ filter }}"</span>.</p>
            </div>
        </div>
    </Section>
</template>

<style scoped lang="scss">
.non-favourite {
    min-height: 80vh;

    &__cards {
        display: grid;
        margin-left: rem(-$padding);
        margin-right: rem(-$padding);
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
</style>
