<script setup lang="ts">
import { onMounted } from 'vue';
import { TwitchService } from '../app/shared/services/twitch.service';

onMounted(async ()=> {
    const twitchSerive = new TwitchService()
    const bob = await twitchSerive.getVideos(52385053)
    console.log(bob)
})
</script>

<template>
    <section class="live">
        <h1>Live</h1>
    </section>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.live {
}
</style>
