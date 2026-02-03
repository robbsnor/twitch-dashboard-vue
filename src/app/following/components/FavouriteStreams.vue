<script setup lang="ts">
import CardLiveFancy from '../components/CardLiveFancy.vue';
import { useFollowingStore } from '../stores/following.store';

const followingStore = useFollowingStore();
</script>

<template>
    <template v-if="followingStore.favouriteStreams.length">
        <Section title="Favourites">
            <template #backgroundArt>
                <Swirl></Swirl>
            </template>

            <template #actions>
                <v-btn-toggle
                    density="compact"
                    variant="outlined"
                    v-model="followingStore.sortFavouritesByViewers"
                    mandatory
                >
                    <v-btn :value="true" class="min-w-0! px-3!">
                        <v-icon>mdi-account-arrow-down</v-icon>
                    </v-btn>

                    <v-btn :value="false" class="min-w-0! px-3!">
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </template>

            <div
                class="grid gap-12 md:grid-cols-2 lg:grid-cols-3"
                v-fade-stagger="{ delayBetweenItems: 100 }"
                v-auto-animate
            >
                <div
                    v-for="stream in followingStore.favouriteStreams"
                    :key="stream.user_id"
                    class="w-full lg:nth-[3n-1]:mt-12"
                >
                    <CardLiveFancy :stream="stream" />
                </div>
            </div>
        </Section>

        <Section>
            <ZigZag />
        </Section>
    </template>
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
