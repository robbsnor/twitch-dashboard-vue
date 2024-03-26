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

const _filter = ref('');
const _cards = computed(() => {
    if (!props.streams) return;
    // TODO: Have a normal and small card ref
    return LiveFactory.mapToCardLiveNormal(props.streams);
})

const _filteredCards = computed(() => {
    return _cards.value?.filter(card => {
        const nameMatch = card.name.toLowerCase().includes(_filter.value.toLowerCase());
        const gameMatch = card.game.toLowerCase().includes(_filter.value.toLowerCase());
        const titleMatch = card.title.toLowerCase().includes(_filter.value.toLowerCase());
        const idMatch = card.userId.toString().toLowerCase().includes(_filter.value.toLowerCase());

        return nameMatch || gameMatch || titleMatch || idMatch;
    })
})

const _cardSize = computed((): CardLiveSize => width.value >= 1000 ? 'normal' : 'small');
</script>

<template>
    <Section title="Live channels">
        <template #actions>
            <el-input v-model="_filter" size="large" placeholder="Search videos..." clearable></el-input>
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
    }

    &__card {
        margin-left: rem(-$padding);
        margin-right: rem(-$padding);
    }

    @include screen($desktop) {
        &__cards {
            grid-template-columns: repeat(3, 1fr);
            gap: rem(50px) rem(30px);
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
</style>
