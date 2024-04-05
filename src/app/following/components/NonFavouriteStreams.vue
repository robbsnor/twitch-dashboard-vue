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
}>()

const _gamePickerDialog = ref(false);
const _filter = ref<String | null>('');
const _cards = computed(() => {
    if (!props.streams) return;
    // TODO: Have a normal and small card ref
    return LiveFactory.mapToCardLiveNormal(props.streams);
})

const _filteredCards = computed(() => {
    return _cards.value?.filter(card => {
        // clicking the clear button sets the value to null,
        // we cannot opperate on null, so we set it to an empty string
        if (_filter.value === null) _filter.value = '';

        const nameMatch = card.name.toLowerCase().includes(_filter.value.toLowerCase());
        const gameMatch = card.game.toLowerCase().includes(_filter.value.toLowerCase());
        const titleMatch = card.title.toLowerCase().includes(_filter.value.toLowerCase());
        const idMatch = card.userId.toString().toLowerCase().includes(_filter.value.toLowerCase());

        return nameMatch || gameMatch || titleMatch || idMatch;
    })
})

const _categories = computed(() => {
    const duplicateCategories = _cards.value?.map(card => card.game).sort();
    const categories = [...new Set(duplicateCategories)];
    return categories
})

const _cardSize = computed((): CardLiveSize => width.value >= 1000 ? 'normal' : 'small');
</script>

<template>
    <Section title="Live channels">
        <template #actions>
            <div class="filter">
                <v-text-field
                    v-model="_filter"
                    appendIcon="mdi-filter-variant"
                    @click:append="_gamePickerDialog = true"
                    placeholder="Search streams..."
                    class="filter__search"
                />

                <v-dialog max-width="500" v-model="_gamePickerDialog">
                    <template v-slot:default>
                        <DialogBase @close="_gamePickerDialog = false">
                            <ul>
                                <li
                                    v-for="category in _categories"
                                    :key="category"
                                    @click="_filter = category;
                                    _gamePickerDialog = false"
                                    class="list"
                                >{{ category }}</li>
                            </ul>
                        </DialogBase>
                    </template>
                </v-dialog>
            </div>
        </template>

        <div class="non-favourite">
            <div v-if="_filteredCards" class="non-favourite__cards">
                <div v-for="card in _filteredCards" :key="card.userId" class="non-favourite__card" v-auto-animate>
                    <CardLive :card="card" :size="_cardSize"></CardLive>
                </div>
            </div>

            <Spinner padding v-else></Spinner>
        </div>
    </Section>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.non-favourite {
    &__acctions {
        padding-bottom: rem(20px);
    }

    &__cards {
        display: grid;
        margin-left: rem(-$padding);
        margin-right: rem(-$padding);
    }

    @include screen($desktop) {
        &__cards {
            grid-template-columns: repeat(3, 1fr);
            gap: rem(50px) rem(30px);
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
    padding-bottom: rem($padding);
}

.list {
    color: $c-white;
    padding: 10px 0;
}
</style>
