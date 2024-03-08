<script setup lang="ts">
import Section from '@/app/shared/components/Section.vue';
import type { TwitchFollowedStream } from '../../shared/models/twitch/followed-streams.model';
import { onMounted } from 'vue';
import { CardFactory } from '../factories/card.factory';


const props = defineProps<{
  streams: TwitchFollowedStream[];
}>()

// const streams = CardFactory.mapToCardLive(props.streams)

onMounted(() => {

})

</script>

<template>
    <Section title="Favourites">
        <code>
            {{ props.streams }}
        </code>
    </Section>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';
</style>
