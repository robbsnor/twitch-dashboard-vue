<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams.model';
import CardLive from '../components/CardLive.vue';
import { LiveFactory } from '../factories/live.factory';
import type { CardLiveSize } from '../models/card-live.model';

const { width } = useWindowSize();

const props = defineProps<{
    streams?: TwitchFollowedStreamWithUser[];
}>();

const filter = ref<string>();
const mainMinHeight = ref(0);
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

    return LiveFactory.mapToCardLiveNormal(videos);
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

    const el = document.querySelector('.filter__search');
    if (!el) return;

    const yOffset = -120;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
};

onMounted(() => {
    mainMinHeight.value = getMainMinHeight();
});

const getMainMinHeight = () => {
    return document.querySelector('.non-favourite__cards')?.clientHeight || 0;
};
</script>

<template>
    <Section title="Live channels" ref="sectionEl">
        <template #actions>
            <div class="filter">
                <v-combobox
                    v-model="filter"
                    :items="categories"
                    placeholder="Search streams..."
                    @update:focused="setSearchToTopOfPage($event)"
                    class="filter__search"
                />
            </div>
        </template>

        <div class="non-favourite" :style="'min-height: ' + mainMinHeight + 'px'">
            <div v-if="cards" class="non-favourite__cards">
                <div v-for="card in cards" :key="card.userId" class="non-favourite__card" v-auto-animate>
                    <CardLive :card="card" :size="cardSize" />
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
    min-height: rem(330px);

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

.list {
    color: $c-white;
    padding: 10px 0;
}

.not-found {
    &__query {
        display: inline-block;
        color: $c-primary;
    }
}
</style>
