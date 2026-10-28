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
                class="grid mx-[-1.25rem] overflow-hidden min-[1000px]:mx-[-3.125rem] min-[1000px]:grid-cols-3 min-[1000px]:gap-x-[1.875rem] min-[1000px]:gap-y-[3.125rem] min-[1000px]:px-[3.125rem] min-[1200px]:grid-cols-4 min-[1500px]:grid-cols-5"
                v-fade-stagger
                v-auto-animate
            >
                <template v-for="stream in followingStore.nonFavouriteStreams" :key="stream.user_id">
                    <div class="min-[1000px]:hidden">
                        <CardLiveSmall :stream="stream" />
                    </div>

                    <div class="hidden min-[1000px]:block">
                        <CardLiveNormal :stream="stream" />
                    </div>
                </template>
            </div>
        </div>
    </Section>
</template>
