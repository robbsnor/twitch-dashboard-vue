<script setup lang="ts">
import { computed, ref } from 'vue';
import { CardLiveService } from '../services/card-live.service';
import type { CardLive as CardLiveModel } from '../models/card-live.model';
import CardLiveOptions from './CardLiveOptions.vue';
import ManageFavouriteDialog from './ManageFavouriteDialog.vue';

const props = defineProps<{
    card: CardLiveModel;
}>();

const favDialog = ref<boolean>(false);

const cssClass = computed(() => {
    return {
        'card-normal': true,
    };
});

const viewers = computed(() => CardLiveService.getViewers(props.card.viewers));
const uptime = computed(() => CardLiveService.getUptime(props.card.startedAt));

const userForAddFavourite = computed(() => {
    return {
        name: props.card.name,
        avatar: props.card.avatar,
        id: props.card.userId,
    };
});

const openFavouriteDialog = () => (favDialog.value = true);
</script>

<template>
    <div :class="cssClass" :data-user-id="card.userId" class="grow-0 shrink-0">
        <a
            :href="card.link"
            target="_blank"
            class="group block relative aspect-video transition-all bg-black hover:-translate-x-1 hover:translate-y-1"
        >
            <span class="sr-only">Watch {{ card.name }}'s stream</span>
            <img :src="card.thumbnail" class="w-full h-full rounded transition-all" alt="thumbnail" />
            <div class="absolute inset-0 -z-1"></div>
            <div class="arrow hidden">(icon)</div>
            <div
                class="absolute bottom-0 right-0 flex items-end justify-end size-37.5 transition-all pointer-events-none py-1 px-3 text-muted group-hover:text-normal"
                style="background: linear-gradient(-45deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%)"
            >
                {{ viewers }}
            </div>
            <div
                class="absolute bottom-0 left-0 flex items-end justify-start size-37.5 pointer-events-none py-1 px-2 transition-all opacity-0 group-hover:opacity-100"
                style="background: linear-gradient(45deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%)"
            >
                <div class="flex items-center gap-1">
                    <div class="size-3 bg-red-500 rounded-full -mt-0.5"></div>
                    {{ uptime }}
                </div>
            </div>
        </a>

        <div class="pt-2 line-clamp-1 font-bold text-lg break-all">
            {{ card.title }}
        </div>
        <div v-if="card.game" class="text-muted">{{ card.game }}</div>

        <div class="flex justify-between items-center">
            <RouterLink :to="`/user/${card.name}`" class="flex items-center">
                <img v-if="card.avatar" :src="card.avatar" class="block size-[25px] rounded-full mr-2" alt="avatar" />
                <div class="text-primary">{{ card.name }}</div>
            </RouterLink>

            <v-menu location="bottom right" origin="overlap">
                <template #activator="{ props }">
                    <v-btn class="-mr-2" v-bind="props" variant="text" icon="mdi-dots-vertical" size="small" />
                </template>

                <CardLiveOptions
                    :game="card.game"
                    :username="card.name"
                    :userId="card.userId"
                    :isFavourite="false"
                    @add-favourite="favDialog = true"
                />
            </v-menu>
        </div>
    </div>

    <ManageFavouriteDialog v-model="favDialog" :user="userForAddFavourite" />
</template>
