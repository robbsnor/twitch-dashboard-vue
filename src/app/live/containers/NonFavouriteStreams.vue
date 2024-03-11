<script setup lang="ts">
import Section from '@/app/shared/components/Section.vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams.model';
import CardLive from '../components/CardLive.vue';
import { CardLiveFactory } from '../factories/card-live.factory';
import Spinner from '@/app/shared/components/Spinner.vue';
import type { CardLiveSize } from '../models/card-live.model';

const props = defineProps<{
    streams?: TwitchFollowedStreamWithUser[];
}>()

const cardSize = ref<CardLiveSize>('small');
const filter = ref('');

const cards = computed(() => {
    if (!props.streams) return;
    return CardLiveFactory.mapFromFollowdStream(props.streams)
})

const filteredCards = computed(() => {
    if (!cards.value) return;

    return cards.value.filter(card => {
        const nameMatch = card.name.toLowerCase().includes(filter.value.toLowerCase())
        const gameMatch = card.game.toLowerCase().includes(filter.value.toLowerCase())
        const titleMatch = card.title.toLowerCase().includes(filter.value.toLowerCase())
        const idMatch = card.userId.toString().toLowerCase().includes(filter.value.toLowerCase())

        return nameMatch || gameMatch || titleMatch || idMatch
    })
})

onMounted(() => {
    determineCardSize()
    window.addEventListener('resize', determineCardSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', determineCardSize);
});

const determineCardSize = () => cardSize.value = window.innerWidth >= 1000 ? 'normal' : 'small';
</script>

<template>
    <Section title="Live channels">
        <div class="non-favourite">
            <input v-model="filter" type="text" placeholder="Search streams" style="margin: 10px 0; padding: 10px;">

            <div v-if="filteredCards" class="non-favourite__cards">
                <div v-for="card in filteredCards" :key="card.name" class="non-favourite__card">
                    <CardLive :card="card" :size="cardSize"></CardLive>
                </div>
            </div>

            <Spinner v-else></Spinner>
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
            grid-template-columns: repeat(2, 1fr);
            gap: rem(50px) rem(30px);
        }

        &__card {
            margin-left: 0;
            margin-right: 0;
        }
    }

    @include screen(1200px) {
        &__cards {
            grid-template-columns: repeat(5, 1fr);
        }
    }
}
</style>
