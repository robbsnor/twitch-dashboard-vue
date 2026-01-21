<script setup lang="ts">
import { computed, ref } from 'vue';
import { CardLiveService } from '../services/card-live.service';
import CardLiveOptions from './CardLiveOptions.vue';
import ManageFavouriteDialog from './ManageFavouriteDialog.vue';
import { TwitchService } from '@/app/shared/services/twitch.service';
import type { TwitchFollowedStreamWithUser } from '@/app/shared/models/twitch/followed-streams-with-user.model';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import { useToast } from 'vue-toast-notification';

const props = defineProps<{
    stream: TwitchFollowedStreamWithUser;
}>();
const favouriteStore = useFavouriteStore();
const toast = useToast();
const viewers = computed(() => CardLiveService.getViewers(props.stream.viewer_count));
const uptime = computed(() => CardLiveService.getUptime(props.stream.started_at));
const manageDialog = ref(false);
const removeDialog = ref(false);

const removeFavourite = async () => {
    await favouriteStore.removeUser(Number(props.stream.user_id));
    toast.success(`Removed ${props.stream.display_name} from favourites`);
    removeDialog.value = false;
};
</script>

<template>
    <div
        class="group relative transition-all md:hover:-translate-x-1 md:hover:translate-y-1"
        :data-user-id="stream.user_id"
    >
        <div class="flex items-center pb-2 gap-6">
            <RouterLink :to="`/user/${stream.user_name}`" class="z-1 flex items-center gap-3 no-underline">
                <img
                    v-if="stream.profile_image_url"
                    :src="stream.profile_image_url"
                    class="size-10 shrink-0 rounded-full"
                    alt="avatar"
                />
                <div class="text-primary text-lg overflow-hidden">{{ stream.user_name }}</div>
            </RouterLink>

            <div class="flex items-center gap-1.5 text-black-1900 mr-1 ml-auto text-lg font-bold">
                {{ viewers }}
                <v-icon size="18">mdi-account</v-icon>
            </div>
        </div>

        <div v-if="stream.game_name" class="line-clamp-1 w-full shrink-0 text-[38px] font-bold break-all">
            {{ stream.game_name }}
        </div>
        <div class="text-black-1900 mb-3 line-clamp-1 w-full text-[18px] font-bold break-all">
            {{ stream.title }}
        </div>

        <div class="-mx-4 md:mx-0 transition-all">
            <img
                :src="TwitchService.getStreamThumbnail(stream.thumbnail_url, 720)"
                class="aspect-video w-full"
                alt="thumbnail"
            />
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

        <v-menu location="top right" origin="overlap" :offset="[0, 10]">
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

            <CardLiveOptions
                :stream="stream"
                :isFavourite="true"
                @editFavourites="manageDialog = true"
                @removeFavourite="removeDialog = true"
            />
        </v-menu>

        <a
            :href="`https://www.twitch.tv/${stream.user_login}`"
            target="_blank"
            class="absolute top-0 -right-4 bottom-0 -left-4 block"
            :data-user-id="stream.user_id"
        >
            <span class="sr-only">Watch {{ stream.user_name }}'s stream</span>
        </a>
    </div>

    <DeleteDialog
        v-model="removeDialog"
        confirmText="Remove"
        icon="mdi-heart-remove"
        :title="`Remove ${stream.user_name} from favourites?`"
        description="Are you sure?"
        @confirm="removeFavourite"
    />

    <ManageFavouriteDialog v-model="manageDialog" :stream="stream" :allowInsertBelow="false" />
</template>
