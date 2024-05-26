<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { computed, ref } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams.model';
import CardLive from '../components/CardLive.vue';
import { LiveFactory } from '../factories/live.factory';
import type { CardLiveSize } from '../models/card-live.model';

const { width } = useWindowSize();

const props = defineProps<{
    streams?: TwitchFollowedStreamWithUser[];
}>();

const _filter = ref<string>();

const _cards = computed(() => {
    const videos = props.streams?.filter(stream => {
        if (!_filter.value) return true;

        const nameMatch = stream.user_name.toLowerCase().includes(_filter.value.toLowerCase());
        const gameMatch = stream.game_name?.toLowerCase().includes(_filter.value.toLowerCase());
        const titleMatch = stream.title.toLowerCase().includes(_filter.value.toLowerCase());
        const idMatch = stream.user_id.toString().toLowerCase().includes(_filter.value.toLowerCase());

        return nameMatch || gameMatch || titleMatch || idMatch;
    });
    if (!videos) return;

    return LiveFactory.mapToCardLiveNormal(videos);
});

const _categories = computed(() => {
    const duplicateCategories = props.streams?.map(stream => stream.game_name).sort();
    const categories = [...new Set(duplicateCategories)];
    return categories;
});

const _cardSize = computed((): CardLiveSize => width.value >= 1000 ? 'normal' : 'small');
</script>

<template>
    <Section title="Live channels">
        <template #actions>
            <div class="filter">
                <v-combobox
                    v-model="_filter"
                    :items="_categories"
                    placeholder="Stream, game or user..."
                    class="filter__search"
                />
            </div>
        </template>

        <div class="non-favourite">
            <div v-if="_cards" class="non-favourite__cards">
                <div v-for="card in _cards" :key="card.userId" class="non-favourite__card" v-auto-animate>
                    <CardLive :card="card" :size="_cardSize"></CardLive>
                </div>
            </div>

            <Spinner padding v-else></Spinner>

            <div v-if="!_cards?.length && _filter?.length" class="non-favourite__not-found not-found">
                No streams found matching <span class="not-found__query">"{{ _filter }}"</span>.
            </div>
        </div>
    </Section>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

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
