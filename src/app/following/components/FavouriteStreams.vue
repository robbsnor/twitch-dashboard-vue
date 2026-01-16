<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams-with-user.model';
import CardLiveFancy from '../components/CardLiveFancy.vue';

const props = defineProps<{
    streams?: TwitchFollowedStreamWithUser[];
    categories?: string[];
}>();
</script>

<template>
    <Section v-if="streams?.length" title="Favourites">
        <template #backgroundArt>
            <Swirl v-if="streams?.length" class="swirl"></Swirl>
        </template>

        <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-3" v-fade-stagger="{ delay: 100 }" v-auto-animate>
            <div v-for="stream in streams" :key="stream.user_id" class="w-full lg:nth-[3n-1]:mt-12">
                <CardLiveFancy :stream="stream" />
            </div>
        </div>
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
