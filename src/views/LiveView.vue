<script setup lang="ts">
import { onMounted } from 'vue';
import { TwitchService } from '../app/shared/services/twitch.service';

import Section from '@/app/shared/components/Section.vue';

onMounted(async ()=> {
    const twitchSerive = new TwitchService()
    const bob = await twitchSerive.getFollowedStreams()
    console.log(bob)
})
</script>

<template>
    <div class="live">
        <Section title="Favourites">
        </Section>

        <Section title="Live channels"></Section>
        <Section title="Continue watching"></Section>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.live {
    padding-top: $header-height;
}
</style>
