<script setup lang="ts">
import Section from '@/app/shared/components/Section.vue';
import { computed } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams.model';
import { CardFactory } from '../factories/card.factory';
import Card from '../components/Card.vue';

const props = defineProps<{
    streams: TwitchFollowedStreamWithUser[];
}>()

const cards = computed(() => {
    return CardFactory.mapToCardLive(props.streams)
})
</script>

<template>
    <Section title="Favourites">
        <div class="favourites">
            <div class="favourites__cards">
                <div v-for="card in cards" :key="card.name" class="favourites__card">
                    <Card :card="card" size="fancy"></Card>
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

.favourites {
    &__cards {
        display: grid;
        gap: rem(50px);
    }

    &__card {
        width: 100%;
    }

    @include screen(800px) {
        &__cards {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @include screen(1200px) {
        &__cards {
            grid-template-columns: repeat(3, 1fr);
        }

        &__card {
            &:nth-child(3n - 1) {
                margin-top: rem(50px);
            }
        }
    }
}

.other-cards {
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

.other-cards-actions {
    @include screen($desktop) {
        &__filter {
            width: 336px;
        }
    }
}

.empty {
    padding: rem(25px) 0;
    text-align: center;
}

</style>
