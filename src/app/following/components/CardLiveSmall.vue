<script setup lang="ts">
import { computed, ref } from 'vue';
import { CardLiveService } from '../services/card-live.service';
import type { CardLive as CardLiveModel } from '../models/card-live.model';
import CardLiveOptions from './CardLiveOptions.vue';

const props = defineProps<{
    card: CardLiveModel;
}>();

const sheet = ref(false);

const viewers = computed(() => CardLiveService.getViewers(props.card.viewers));
</script>

<template>
    <div
        class="relative grid grid-cols-[150px_1fr] px-5 py-2.5 transition-all hover:bg-black-300"
        :data-user-id="card.userId"
    >
        <div class="relative mr-4 shrink-0 grow-0 aspect-video">
            <div
                class="right-0 bottom-0 flex items-end justify-end pointer-events-none absolute h-15 aspect-square p-1 px-2 text-muted text-sm"
                style="background: linear-gradient(-45deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%)"
            >
                {{ viewers }}
            </div>

            <v-bottom-sheet v-model="sheet" inset>
                <template v-slot:activator="{ props }">
                    <div class="absolute -top-1 -right-1 z-1">
                        <v-btn v-bind="props" variant="text" icon="mdi-dots-vertical" size="small" />
                    </div>
                </template>

                <v-img :src="card.thumbnail" alt="" class="rounded-t-md" eager />

                <div class="bg-black/80 p-4 pb-1">
                    <div style="color: white; margin-bottom: 4px">
                        {{ card.title }}
                    </div>
                    <div class="text-muted-more">
                        {{ CardLiveService.getUptime(card.startedAt) }}
                    </div>
                </div>

                <CardLiveOptions
                    v-model:sheet="sheet"
                    :game="card.game"
                    :username="card.name"
                    :userId="card.userId"
                    :isFavourite="false"
                />
            </v-bottom-sheet>

            <img :src="card.thumbnail" class="w-full h-full rounded-md" alt="thumbnail" />
        </div>

        <div class="overflow-hidden flex flex-col items-start">
            <div class="line-clamp-1 shrink-0 font-bold break-all">
                {{ card.title }}
            </div>

            <div v-if="card.game" class="line-clamp-1 break-all relative text-muted">
                {{ card.game }}
            </div>

            <RouterLink :to="`/user/${card.name}`" class="relative flex items-center gap-2 no-underline mt-1 z-1">
                <img v-if="card.avatar" :src="card.avatar" class="block size-6 rounded-full" alt="avatar" />
                <div class="text-primary">{{ card.name }}</div>
            </RouterLink>
        </div>

        <a :href="card.link" target="_blank" class="block absolute inset-0">
            <span class="sr-only">Watch {{ card.name }}'s stream</span>
        </a>
    </div>
</template>
