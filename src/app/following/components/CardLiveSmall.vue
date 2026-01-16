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

const sheet = ref(false);
const dialog = ref(false);

const viewers = computed(() => CardLiveService.getViewers(props.stream.viewer_count));
</script>

<template>
    <div
        class="relative grid grid-cols-[150px_1fr] px-5 py-2.5 transition-all hover:bg-black-300"
        :data-user-id="stream.user_id"
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

                <div class="aspect-video rounded-t-md bg-black overflow-hidden">
                    <v-img :src="TwitchService.getStreamThumbnail(stream.thumbnail_url)" alt="" eager />
                </div>

                <div class="bg-black/80 p-4 pb-1">
                    <div style="color: white; margin-bottom: 4px">
                        {{ stream.title }}
                    </div>
                    <div class="text-muted-more">
                        {{ CardLiveService.getUptime(stream.started_at) }}
                    </div>
                </div>

                <CardLiveOptions
                    v-model:sheet="sheet"
                    :stream="stream"
                    :isFavourite="false"
                    @add-favourite="dialog = true"
                />
            </v-bottom-sheet>

            <img
                :src="TwitchService.getStreamThumbnail(stream.thumbnail_url)"
                class="w-full h-full rounded-md"
                alt="thumbnail"
            />
        </div>

        <div class="overflow-hidden flex flex-col items-start">
            <div class="line-clamp-1 shrink-0 font-bold break-all">
                {{ stream.title }}
            </div>

            <div v-if="stream.game_name" class="line-clamp-1 break-all relative text-muted">
                {{ stream.game_name }}
            </div>

            <RouterLink
                :to="`/user/${stream.user_name}`"
                class="relative flex items-center gap-2 no-underline mt-1 z-1"
            >
                <img
                    v-if="stream.profile_image_url"
                    :src="stream.profile_image_url"
                    class="block size-6 rounded-full"
                    alt="avatar"
                />
                <div class="text-primary">{{ stream.user_name }}</div>
            </RouterLink>
        </div>

        <a :href="`https://www.twitch.tv/${stream.user_login}`" target="_blank" class="block absolute inset-0">
            <span class="sr-only">Watch {{ stream.user_name }}'s stream</span>
        </a>
    </div>

    <ManageFavouriteDialog v-model="dialog" :stream="stream" />
</template>
