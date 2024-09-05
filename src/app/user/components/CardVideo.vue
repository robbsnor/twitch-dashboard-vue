<script setup lang="ts">
import { DateService } from "@/app/shared/services/date.service";
import { NumberService } from "@/app/shared/services/number.service";
import { TimeService } from "@/app/shared/services/time.service";
import { useClipboard } from "@vueuse/core";
import { computed } from "vue";
import { useToast } from "vue-toast-notification";
import { useAuthStore } from "../../auth/stores/auth.store";
import type {
    CardVideoChapter,
    CardVideo as CardVideoModel,
} from "../models/card-video.model";

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
    "click:chapter": (chapter: CardVideoChapter) => true,
});

const copyTwitchDlCommand = (card: CardVideoModel) => {
    const { copy, copied } = useClipboard();
    copy(`twitch-dl download ${card.id} -a AUTH_TOKEN`);
    toast.success(`Copied command!`);
};

const copyVideoId = (card: CardVideoModel) => {
    const { copy, copied } = useClipboard();
    copy(card.id.toString());
    toast.success(`Copied video ID!`);
};

const views = computed(() => NumberService.abbreviateNumber(props.card.views));
const duration = computed(() => TimeService.formatTime(props.card.duration));
const timeAgo = computed(() =>
    DateService.getFormattedTimeBetweenDates(props.card.date)
);
const formattedDate = computed(() => {
    const day = props.card.date.getDate();
    const month = props.card.date.toLocaleDateString(undefined, {
        month: "long",
    });
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    const year = props.card.date.getFullYear();
    return `${day} ${capitalizedMonth} ${year}`;
});
</script>

<template>
    <div class="card-video">
        <a
            :href="props.card.link"
            target="_blank"
            class="card-video__thumbnail-container"
        >
            <span class="sr-only">Watch {{ props.card.title }} video</span>
            <v-img
                v-if="props.showThumbnail"
                :src="props.card.thumbnail"
                class="card-video__thumbnail"
                alt="Stream thumbnail"
            />

            <div v-else class="card-video__thumbnail-empty">
                <div class="card-video__spoiler-text">Spoilers</div>
            </div>

            <div class="card-video__thumbnail-overlay"></div>
            <!-- <div class="card-video__arrow">
                <app-myIcon icon="arrow"></app-myIcon>
            </div> -->
            <div class="card-video__views">{{ views }}</div>
            <div v-if="props.showDuration" class="card-video__duration">
                {{ duration }}
            </div>
        </a>

        <div class="card-video__body">
            <div class="card-video__copy">
                <div class="card-video__title">{{ props.card.title }}</div>
                <div class="card-video__date-wrapper">
                    <span class="card-video__time-ago">{{ timeAgo }}</span>
                    <span class="card-video__date"> / {{ formattedDate }}</span>
                </div>

                <div
                    v-if="props.card.chapters?.length && props.showCategories"
                    class="card-video__chapters"
                >
                    <div
                        v-for="(chapter, i) in props.card.chapters"
                        :key="i"
                        @click="emits('click:chapter', chapter)"
                        class="card-video__chapter"
                    >
                        <img
                            :src="chapter.boxArt"
                            class="card-video__box-art"
                            alt="Chapter box art"
                        />
                        <div class="card-video__chapter-title">
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
                    <v-list-item
                        prepend-icon="mdi-console-line"
                        @click="copyTwitchDlCommand(card)"
                        >Copy twitch-dl cmd</v-list-item
                    >
                    <v-list-item
                        prepend-icon="mdi-content-copy"
                        @click="copyVideoId(card)"
                        >Copy video id</v-list-item
                    >
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card-video {
    $self: &;

    &__thumbnail-container {
        display: block;
        position: relative;
        aspect-ratio: 16 / 9;
        transition: 0.2s;
        overflow: hidden;

        &:hover,
        &:focus-visible {
            transform: translate(#{rem(-5px)}, #{rem(5px)});

            #{ $self }__arrow {
                opacity: 1;
                transform: translate(#{rem(10px)}, #{rem(-10px)});
            }

            #{ $self }__username {
                color: $c-white;
            }

            #{ $self }__thumbnail {
                opacity: 1;
            }

            #{ $self }__options {
                opacity: 0.8;
            }
        }
    }

    &__arrow {
        position: absolute;
        top: rem(20px);
        right: rem(20px);
        color: $c-black-14;
        font-size: rem(16px);
        opacity: 0;
        transition: 0.2s;
    }

    &__views {
        position: absolute;
        bottom: rem(7px);
        left: rem(10px);
        color: $c-white--dark;
    }

    &__duration {
        position: absolute;
        bottom: rem(7px);
        right: rem(10px);
        color: $c-primary;
    }

    &__thumbnail {
        width: 100%;
        height: 100%;
        border-radius: $border-radius-normal;
        opacity: 0.7;
        transition: 0.2s;
    }

    &__thumbnail-empty {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: $border-radius-normal;
        background-color: $c-black-3;
    }

    &__spoiler-text {
        font-style: italic;
        font-size: rem(14px);
        color: $c-black-20;
    }

    &__thumbnail-overlay {
        position: absolute;
        background-color: black;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
    }

    &__options {
        transform: translateX(10px);
        transition: 0.2s;
    }

    &__body {
        display: flex;
        gap: 20px;
        justify-content: space-between;
        padding-top: rem(12px);
    }

    &__title {
        color: $c-white;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding-bottom: rem(8px);
    }

    &__date-wrapper {
        font-size: rem(16px);
        overflow: hidden;
        color: $c-white--dark;
    }

    &__time-ago {
        transition: 0.2s;
    }

    &__date {
        color: $c-black-14;
    }

    &__chapters {
        padding-top: rem(10px);
        display: flex;
        flex-direction: column;
        gap: rem(10px);
    }

    &__chapter {
        display: flex;
        align-items: center;
        gap: rem(10px);
    }

    &__box-art {
        flex-grow: 0;
        width: rem(20px);
        border-radius: rem(3px);
    }

    &__chapter-title {
        font-size: rem(16px);
    }

    @include screen(1000px) {
        &__options {
            opacity: 0;
        }

        &:hover {
            #{ $self }__options {
                opacity: 1;
            }
        }
    }
}
</style>
