<script setup lang="ts">
import { useFollowingStore } from '../stores/following.store';

const followingStore = useFollowingStore();
</script>

<template>
    <template
        v-if="
            !!followingStore.filter &&
            !followingStore.favouriteStreams.length &&
            !followingStore.nonFavouriteStreams.length
        "
    >
        <Section>
            <ZigZag />
        </Section>

        <div class="py-20">
            <Empty icon="mdi-close" title="Nope, nothing here...">
                <div class="text-muted">
                    No streams found for: <span class="text-primary">"{{ followingStore.filter }}"</span>
                </div>
                <v-btn variant="tonal" class="mt-4" @click="followingStore.filter = undefined">Clear filter</v-btn>
            </Empty>
        </div>

        <Section>
            <ZigZag />
        </Section>
    </template>
</template>
