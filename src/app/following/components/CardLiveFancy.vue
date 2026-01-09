<script setup lang="ts">
import { computed } from 'vue';
import { CardLiveService } from '../services/card-live.service';
import type { CardLive as CardLiveModel } from '../models/card-live.model';
import CardLiveOptions from './CardLiveOptions.vue';

const props = defineProps<{
    card: CardLiveModel;
}>();

const viewers = computed(() => CardLiveService.getViewers(props.card.viewers));
const uptime = computed(() => CardLiveService.getUptime(props.card.startedAt));
</script>

<template>
    <div
        class="group relative transition-all md:hover:-translate-x-1 md:hover:translate-y-1"
        :data-user-id="card.userId"
    >
        <div class="flex items-center pb-4 gap-6">
            <RouterLink :to="`/user/${card.name}`" class="z-1 flex items-center gap-3 no-underline">
                <img v-if="card.avatar" :src="card.avatar" class="size-10 shrink-0 rounded-full" alt="avatar" />
                <div class="text-primary text-lg overflow-hidden">{{ card.name }}</div>
            </RouterLink>

            <div class="flex items-center gap-1.5 text-black-1900 mr-1 ml-auto text-lg font-bold">
                {{ viewers }}
                <v-icon size="18">mdi-account</v-icon>
            </div>

            <!-- <app-myIcon icon="arrow" class="transition-all"></app-myIcon> -->
        </div>

        <div v-if="card.game" class="line-clamp-1 w-full shrink-0 text-[38px] font-bold break-all">
            {{ card.game }}
        </div>
        <div class="text-black-1900 mb-3 line-clamp-1 w-full text-[18px] font-bold break-all">
            {{ card.title }}
        </div>

        <div class="-mx-4 md:mx-0 transition-all">
            <img :src="card.thumbnail" class="aspect-video w-full" alt="thumbnail" />
        </div>

        <div
            class="pointer-events-none absolute bottom-0 -left-4 flex aspect-square size-50 items-end p-3 transition-all md:left-0"
            style="background: linear-gradient(45deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%)"
        >
            <div class="flex items-center justify-center gap-2 pl-1">
                <div class="size-3 rounded-full bg-red-500 -mt-0.5"></div>
                {{ uptime }}
            </div>
        </div>

        <v-menu location="bottom right" origin="overlap" :offset="[0, 10]">
            <template #activator="{ props }">
                <div
                    class="text-muted-more absolute -right-4 bottom-0 flex size-50 items-end justify-end p-2 md:right-0"
                    style="background: linear-gradient(-45deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%)"
                >
                    <v-btn
                        v-bind="props"
                        class="relative z-10"
                        color="white"
                        variant="text"
                        icon="mdi-dots-vertical"
                        size="small"
                    />
                </div>
            </template>

            <CardLiveOptions :game="card.game" :username="card.name" :userId="card.userId" :isFavourite="true" />
        </v-menu>

        <!-- <button app-icon-button (click)="handleOptionsClick(card)" icon="more-vertical" hoverColor="black" class="card-fancy__options"></button> -->

        <a
            :href="card.link"
            target="_blank"
            class="absolute top-0 -right-4 bottom-0 -left-4 block"
            :data-user-id="card.userId"
        >
            <span class="sr-only">Watch {{ card.name }}'s stream</span>
        </a>
    </div>
</template>
