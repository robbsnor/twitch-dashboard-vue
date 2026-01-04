<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams-with-user.model';
import CardLiveFancy from '../components/CardLiveFancy.vue';
import { FollowingFactory } from '../factories/following.factory';

const filter = defineModel<string>('filter');

const props = defineProps<{
    streams?: TwitchFollowedStreamWithUser[];
    categories?: string[];
}>();

const cards = computed(() => {
    if (!props.streams) return;
    return FollowingFactory.mapToCardLiveFancy(props.streams);
});
</script>

<template>
    <Section title="Favourites">
        <template #backgroundArt>
            <Swirl v-if="streams?.length" class="swirl"></Swirl>
        </template>

        <div v-if="cards?.length" class="grid gap-12 md:grid-cols-2 lg:grid-cols-3" v-fade-stagger="{ delay: 100 }">
            <div v-for="card in cards" :key="card.userId" class="w-full lg:nth-[3n-1]:mt-12" v-auto-animate>
                <CardLiveFancy :card="card" v-model:filter="filter" />
            </div>
        </div>

        <p v-else>No favourite streamers online.</p>
    </Section>
</template>

<style scoped lang="scss">
.favourites-swirl {
    position: absolute;
    top: 330px;
    left: 50%;
    min-width: $container-default-width;
    transform: translateX(-50%);

    @include screen($desktop) {
        top: 200px;
    }
}
</style>
