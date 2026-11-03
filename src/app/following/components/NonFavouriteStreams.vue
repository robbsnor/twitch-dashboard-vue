<script setup lang="ts">
import CardLiveSmall from '../components/CardLiveSmall.vue';
import CardLiveNormal from '../components/CardLiveNormal.vue';
import { useFollowingStore } from '../stores/following.store';

const followingStore = useFollowingStore();
</script>

<template>
    <Section v-if="followingStore.nonFavouriteStreams.length" title="Live channels">
        <div>
            <div
                class="grid overflow-hidden -mx-2 px-2 gap-x-6 gap-y-10 lg:grid-cols-3 l xl:grid-cols-4 2xl:grid-cols-5"
                v-fade-stagger
                v-auto-animate
            >
                <template v-for="stream in followingStore.nonFavouriteStreams" :key="stream.user_id">
                    <div class="lg:hidden">
                        <CardLiveSmall :stream="stream" />
                    </div>

                    <div class="hidden lg:block">
                        <CardLiveNormal :stream="stream" />
                    </div>
                </template>
            </div>
        </div>
    </Section>
</template>
