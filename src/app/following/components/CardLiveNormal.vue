<script setup lang="ts">
import { computed, ref } from 'vue';
import { CardLiveService } from '../services/card-live.service';
import type { CardLive as CardLiveModel } from '../models/card-live.model';
import CardLiveOptions from './CardLiveOptions.vue';
import ManageFavouriteDialog from './ManageFavouriteDialog.vue';
import type { TwitchFollowedStreamWithUser } from '@/app/shared/models/twitch/followed-streams-with-user.model';
import { TwitchService } from '@/app/shared/services/twitch.service';

const props = defineProps<{
    stream: TwitchFollowedStreamWithUser;
}>();

const dialog = ref<boolean>(false);

const cssClass = computed(() => {
    return {
        'card-normal': true,
    };
});

const viewers = computed(() => CardLiveService.getViewers(props.stream.viewer_count));
const uptime = computed(() => CardLiveService.getUptime(props.stream.started_at));
</script>

<template>
    <div :class="cssClass" :data-user-id="stream.user_id" class="grow-0 shrink-0">
        <a
            :href="`https://www.twitch.tv/${stream.user_login}`"
            target="_blank"
            class="group block relative aspect-video transition-all bg-black hover:-translate-x-1 hover:translate-y-1"
        >
            <span class="sr-only">Watch {{ stream.user_name }}'s stream</span>
            <img
                :src="TwitchService.getStreamThumbnail(stream.thumbnail_url)"
                class="w-full h-full rounded transition-all"
                alt="thumbnail"
            />
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
            {{ stream.title }}
        </div>
        <div class="text-muted">{{ stream.game_name || '-' }}</div>

        <div class="flex justify-between items-center">
            <RouterLink :to="`/user/${stream.user_name}`" class="flex items-center">
                <img
                    v-if="stream.profile_image_url"
                    :src="stream.profile_image_url"
                    class="block size-[25px] rounded-full mr-2"
                    alt="avatar"
                />
                <div class="text-primary">{{ stream.user_name }}</div>
            </RouterLink>

            <v-menu location="top right" origin="overlap">
                <template #activator="{ props }">
                    <v-btn class="-mr-2" v-bind="props" variant="text" icon="mdi-dots-vertical" size="small" />
                </template>

                <CardLiveOptions :stream="stream" :isFavourite="false" @add-favourite="dialog = true" />
            </v-menu>
        </div>
    </div>

    <ManageFavouriteDialog v-model="dialog" :stream="stream" />
</template>
