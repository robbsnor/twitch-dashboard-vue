<script setup lang="ts">
import { DateService } from '@/app/shared/services/date.service';
import { NumberService } from '@/app/shared/services/number.service';
import { TimeService } from '@/app/shared/services/time.service';
import { computed } from 'vue';
import type { CardVideo } from '../models/card-video.model';

interface Props {
  card: CardVideo;
}

const props = defineProps<Props>();

const views = computed(() => NumberService.formatThousands(props.card.views));
const duration = computed(() => TimeService.formatTime(props.card.duration));
const date = computed(() => DateService.getFormattedTimeBetweenDates(props.card.date));
</script>

<template>
    <div class="card-video">
        <a href="{{ card.link }}" target="_blank" class="card-video__thumbnail-container">
            <span class="sr-only">Watch {{ card.title }} video</span>
            <img :src="card.thumbnail" class="card-video__thumbnail" />
            <div class="card-video__thumbnail-overlay"></div>
            <div class="card-video__arrow">
                <!-- <app-myIcon icon="arrow"></app-myIcon> -->
            </div>
            <div class="card-video__views">{{ views }}</div>
            <div class="card-video__duration">{{ duration }}</div>
        </a>

        <div class="card-video__text">
            <div class="card-video__info">
                <div class="card-video__title">{{ card.title }}</div>
                <div class="card-video__uploaded">{{ date }}</div>
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
        color: $c-gray;
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

    &__text {
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: rem(15px);
        padding: rem(12px) 0 0;
    }

    &__info {
        overflow: hidden;
        flex: 1;
    }

    &__options {
        transform: translateX(10px);
        transition: .2s;
    }

    &__title {
        flex-shrink: 0;
        color: $c-white;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    &__uploaded {
        font-size: rem(16px);
        padding: rem(6px) 0 0;
        color: $c-white--dark;
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
