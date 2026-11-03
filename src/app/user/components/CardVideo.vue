<script setup lang="ts">
import { DateService } from '@/app/shared/services/date.service';
import { NumberService } from '@/app/shared/services/number.service';
import { TimeService } from '@/app/shared/services/time.service';
import { useClipboard } from '@vueuse/core';
import { computed } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useAuthStore } from '../../auth/stores/auth.store';
import type { CardVideoChapter, CardVideo as CardVideoModel } from '../models/card-video.model';

interface Props {
    card: CardVideoModel;
    showDuration?: boolean;
    showThumbnail?: boolean;
    showCategories?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showDuration: true,
    showThumbnail: true,
    showCategories: true,
});

const authStore = useAuthStore();
const toast = useToast();

const emits = defineEmits({
    'click:chapter': (chapter: CardVideoChapter) => true,
});

const copyTwitchDlCommand = (card: CardVideoModel) => {
    const { copy, copied } = useClipboard();
    copy(`twitch-dl download ${card.id} -a AUTH_TOKEN`);
    toast.success(`Copied command!`);
};

export type TwtichDlQuality = '1080p60' | '720p60' | '480p' | 'Audio Only' | '360p' | '160p';

const downloadVideoById = async (id: number) => {
    const quality: TwtichDlQuality = '720p60';

    const url = new URL('http://localhost:4000/download');
    url.searchParams.set('id', id.toString());
    url.searchParams.set('quality', quality);

    const res = await fetch(url.toString());
    if (!res.ok) {
        return toast.error(`Failed to download video ${id}: ${res}`);
    }

    toast.success(`Download completed`);
    console.log('Download completed');
};

const copyVideoId = (card: CardVideoModel) => {
    const { copy, copied } = useClipboard();
    copy(card.id.toString());
    toast.success(`Copied video id! (${card.id})`);
};

const views = computed(() => NumberService.abbreviateNumber(props.card.views));
const duration = computed(() => TimeService.formatTime(props.card.duration));
const timeAgo = computed(() => DateService.getFormattedTimeBetweenDates(props.card.date));
const formattedDate = computed(() => {
    const day = props.card.date.getDate();
    const month = props.card.date.toLocaleDateString(undefined, {
        month: 'long',
    });
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    const year = props.card.date.getFullYear();
    return `${day} ${capitalizedMonth} ${year}`;
});
</script>

<template>
    <div>
        <a
            :href="props.card.link"
            target="_blank"
            class="group relative block aspect-video overflow-hidden transition duration-200 hover:translate-x-[-5px] hover:translate-y-[5px]"
        >
            <span class="sr-only">Watch {{ props.card.title }} video</span>
            <v-img
                v-if="props.showThumbnail"
                :src="props.card.thumbnail"
                class="h-full w-full rounded opacity-70 transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                alt="Stream thumbnail"
            />

            <div v-else class="flex h-full w-full items-center justify-center rounded bg-black-200">
                <div class="text-sm italic text-black-1900">Spoilers</div>
            </div>

            <div class="absolute inset-0 -z-1 bg-black"></div>
            <!-- <div class="card-video__arrow">
                <app-myIcon icon="arrow"></app-myIcon>
            </div> -->
            <div class="absolute bottom-1 left-3 text-[#ccc]">{{ views }}</div>
            <div v-if="props.showDuration" class="absolute bottom-1 right-3 text-primary">
                {{ duration }}
            </div>
        </a>

        <div class="flex justify-between gap-5 pt-3">
            <div class="overflow-hidden">
                <div class="truncate pb-2 text-white">
                    {{ props.card.title }}
                </div>
                <div class="overflow-hidden text-base text-[#ccc]">
                    <span class="transition duration-200">{{ timeAgo }}</span>
                    <span class="text-black-1300"> / {{ formattedDate }}</span>
                </div>

                <div v-if="props.card.chapters?.length && props.showCategories" class="flex flex-col gap-2.5 pt-2.5">
                    <div
                        v-for="(chapter, i) in props.card.chapters"
                        :key="i"
                        @click="emits('click:chapter', chapter)"
                        class="group flex cursor-pointer items-center gap-2.5"
                    >
                        <img :src="chapter.boxArt" class="w-5 flex-none rounded-[3px]" alt="Chapter box art" />
                        <div class="text-base text-[#ccc] group-hover:text-white">
                            {{ chapter.title }}
                        </div>
                    </div>
                </div>
            </div>

            <v-menu location="bottom right" origin="overlap">
                <template #activator="{ props }">
                    <v-btn
                        class="card-normal__options"
                        v-bind="props"
                        icon="mdi-dots-vertical"
                        size="small"
                        variant="text"
                    />
                </template>
                <v-list>
                    <v-list-item prepend-icon="mdi-download" @click="downloadVideoById(card.id)">
                        Download
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-console-line" @click="copyTwitchDlCommand(card)">
                        Copy twitch-dl cmd
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-content-copy" @click="copyVideoId(card)">
                        Copy video id
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>
