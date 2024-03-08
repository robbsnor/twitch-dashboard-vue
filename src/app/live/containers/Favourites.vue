<script setup lang="ts">
import Section from '@/app/shared/components/Section.vue';
import { computed, onMounted, ref } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams.model';
import { CardFactory } from '../factories/card.factory';
import type { CardLive } from '../models/card.model';
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
        <Card v-for="card in cards" :card="card" size="fancy"></Card>
    </Section>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';
</style>
