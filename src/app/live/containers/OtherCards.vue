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
const cards = computed(() => {
    if (!props.streams) return;
    return CardLiveFactory.mapToCardLive(props.streams)
})

const determineCardSize = () => cardSize.value = window.innerWidth >= 1000 ? 'normal' : 'small';

onMounted(() => {
    determineCardSize()
    window.addEventListener('resize', determineCardSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', determineCardSize);
});
</script>

<template>
    <Section title="Live channels">
        <div class="other">
            <div v-if="cards" class="other__cards">
                <div v-for="card in cards" :key="card.name" class="other__card">
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

.other {
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
</style>../components/CardLive.vue../factories/card-live.factory
