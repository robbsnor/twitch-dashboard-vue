<script setup lang="ts">
import { DateService } from '@/app/shared/services/date.service';
import { NumberService } from '@/app/shared/services/number.service';
import { TimeService } from '@/app/shared/services/time.service';
import { computed } from 'vue';
import type { CardVideo as CardVideoModel } from '../models/card-video.model';

interface Props {
    card: CardVideoModel;
    showDuration?: boolean;
    showThumbnail?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showDuration: true,
    showThumbnail: true,
});

const views = computed(() => NumberService.abbreviateNumber(props.card.views));
const duration = computed(() => TimeService.formatTime(props.card.duration));
const timeAgo = computed(() => DateService.getFormattedTimeBetweenDates(props.card.date));
const formattedDate = computed(() => {
    const day = props.card.date.getDate();
    const month = props.card.date.toLocaleDateString(undefined, { month: 'long' });
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    const year = props.card.date.getFullYear();
    return `${day} ${capitalizedMonth} ${year}`;
});
</script>

<template>
    <div class="card-video">
        <a :href="props.card.link" target="_blank" class="card-video__thumbnail-container">
            <span class="sr-only">Watch {{ props.card.title }} video</span>
            <img v-if="props.showThumbnail" :src="props.card.thumbnail" class="card-video__thumbnail" alt="Stream thumbnail" />
            <div class="card-video__thumbnail-overlay"></div>
            <div class="card-video__arrow">
                <!-- <app-myIcon icon="arrow"></app-myIcon> -->
            </div>
            <div class="card-video__views">{{ views }}</div>
         <div v-if="props.showDuration" class="card-video__duration">{{ duration }}</div>
        </a>

        <div class="card-video__info">
            <div class="card-video__title">{{ props.card.title }}</div>
            <div class="card-video__date-wrapper">
                <span class="card-video__time-ago">{{ timeAgo }}</span> <span class="card-video__date">/ {{ formattedDate }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/functions/rem';
@import '/src/assets/styles/mixins/screen';
@import '/src/assets/styles/mixins/line-clamp';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/var/color';

.card-video {
    $self: &;

    &__thumbnail-container {
        display: block;
        position: relative;
        aspect-ratio: 16 / 9;
        transition: .2s;

        &:hover,
        &:focus-visible {
            transform: translate(#{ rem(-5px) }, #{ rem(5px) });

            #{ $self }__arrow {
                opacity: 1;
                transform: translate(#{ rem(10px) }, #{ rem(-10px) });
            }

            #{ $self }__username {
                color: $c-white;
            }

            #{ $self }__thumbnail {
                opacity: 1;
            }

            #{ $self }__options {
                opacity: .8;
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
        transition: .2s;
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
        opacity: .7;
        transition: .2s;
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
        transition: .2s;
    }

    &__info {
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
        transition: .2s;
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

.card-video-chapter {
    display: flex;
    align-items: center;
    gap: rem(10px);
    opacity: .5;

    &__box-art {
        width: rem(20px);
        border-radius: rem(3px);
    }
}
</style>
