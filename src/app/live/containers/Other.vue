<script setup lang="ts">
import Section from '@/app/shared/components/Section.vue';
import { computed } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams.model';
import Card from '../components/Card.vue';
import { CardFactory } from '../factories/card.factory';

const props = defineProps<{
    streams: TwitchFollowedStreamWithUser[];
}>()

const cards = computed(() => {
    return CardFactory.mapToCardLive(props.streams)
})

</script>

<template>
    <Section title="Live channels">
        <div class="other">
            <div class="other__cards">
                <div v-for="card in cards" :key="card.name" class="other__card">
                    <Card :card="card" size="small"></Card>
                </div>
            </div>
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
</style>
