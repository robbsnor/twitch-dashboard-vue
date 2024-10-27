<script setup lang="ts">
import { computed } from 'vue';
import { CardLiveService } from '../services/card-live.service';
import type { CardLive as CardLiveModel } from "../models/card-live.model";
import CardLiveOptions from "./CardLiveOptions.vue";

const props = defineProps<{
    card: CardLiveModel;
}>();

const filter = defineModel<string>('filter');

const cssClass = computed(() => {
    return {
        'card-fancy': true,
    };
});

const viewers = computed(() => CardLiveService.getViewers(props.card.viewers));
const uptime = computed(() => CardLiveService.getUptime(props.card.startedAt));
</script>

<template>
    <div :class="cssClass" :data-user-id="card.userId">
        <div class="card-fancy__header">
            <RouterLink :to="`/user/${card.name}`" class="card-fancy__user">
                <img
                    v-if="card.avatar"
                    :src="card.avatar"
                    class="card-fancy__avatar"
                    alt="avatar"
                />
                <div class="card-fancy__username">{{ card.name }}</div>
            </RouterLink>

            <div class="card-fancy__viewers">{{ viewers }}</div>
            <!-- <app-myIcon icon="arrow" class="card-fancy__arrow"></app-myIcon> -->
        </div>

        <div class="card-fancy__game">{{ card.game }}</div>
        <div class="card-fancy__title">{{ card.title }}</div>

        <img
            :src="card.thumbnail"
            class="card-fancy__thumbnail"
            alt="thumbnail"
        />

        <div class="card-fancy__uptime">{{ uptime }}</div>

        <v-menu location="bottom right" origin="overlap" :offset="[0, 10]">
            <template #activator="{ props }">
                <div class="card-fancy__options-bg">
                    <v-btn
                        v-bind="props"
                        class="card-fancy__options"
                        variant="text"
                        icon="mdi-dots-vertical"
                        size="small"
                    />
                </div>
            </template>

            <CardLiveOptions
                v-model:filter="filter"
                :game="card.game"
                :username="card.name"
                :userId="card.userId"
                :isFavourite="true"
                :showFilterBy="false"
            />
        </v-menu>

        <!-- <button app-icon-button (click)="handleOptionsClick(card)" icon="more-vertical" hoverColor="black" class="card-fancy__options"></button> -->

        <a
            :href="card.link"
            target="_blank"
            class="card-fancy__link"
            :data-user-id="card.userId"
        >
            <span class="sr-only">Watch {{ card.name }}'s stream</span>
        </a>
    </div>
</template>

<style scoped lang="scss">
.card-fancy {
    $self: &;

    position: relative;
    transition: 0.2s;

    &__header {
        display: flex;
        align-items: center;
        padding-bottom: rem(10px);
    }

    &__user {
        display: flex;
        align-items: center;
        margin-right: rem(25px);
        gap: rem(10px);
        text-decoration: none;
        z-index: 1;
    }

    &__avatar {
        border-radius: 999px;
        width: rem(40px);
        height: rem(40px);
        flex-shrink: 0;
    }

    &__username {
        color: $c-primary;
        overflow: hidden; // temp, append dots
    }

    &__viewers {
        margin-left: auto;
        margin-right: rem(25px);
        font-weight: bold;
        color: $c-black-20;
    }

    &__arrow {
        transition: 0.2s;
    }

    &__game {
        @include line-clamp(1);
        width: 100%;
        color: $c-white;
        font-size: rem(38px);
        font-weight: bold;
        flex-shrink: 0;
    }

    &__title {
        @include line-clamp(1);
        width: 100%;
        font-size: rem(18px);
        font-weight: bold;
        color: $c-black-20;
        padding: rem(6px) 0 0;
        margin-bottom: rem(10px);
        word-break: break-word;
    }

    &__thumbnail {
        aspect-ratio: 16 / 9;
        width: calc(100% + rem($padding) * 2);
        max-width: unset;
        margin-left: rem(-$padding);
    }

    &__uptime {
        opacity: 0;
        position: absolute;
        bottom: 0;
        left: rem(-$padding);
        display: flex;
        align-items: flex-end;
        aspect-ratio: 1 / 1;
        height: rem(200px);
        padding: rem(10px) rem(17px);
        color: $c-white--dark;
        background: linear-gradient(45deg, rgba(0, 0, 0, .8) 0%, rgba(0, 0, 0, 0) 50%);
        transition: .2s;
        pointer-events: none;
    }

    &__options-bg {
        position: absolute;
        bottom: 0;
        right: rem(-$padding);
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        aspect-ratio: 1 / 1;
        height: rem(200px);
        padding: rem(10px);
        color: $c-white--dark;
        background: linear-gradient(-45deg, rgba(0, 0, 0, .8) 0%, rgba(0, 0, 0, 0) 50%);
    }

    &__options {
        z-index: 1;
    }

    &__link {
        display: block;
        position: absolute;
        top: 0;
        right: rem(-$padding);
        bottom: 0;
        left: rem(-$padding);
    }

    &:hover {
        #{ $self }__arrow {
            transform: translate(#{rem(10px)}, #{rem(-10px)});
        }

        #{ $self }__uptime {
            opacity: 1;
        }
    }

    @include screen(800px) {
        &__thumbnail {
            max-width: 100%;
            margin-left: 0;
            border-radius: $border-radius-normal;
        }

        &__uptime {
            left: 0;
        }

        &__options-bg {
            right: 0;
        }

        &__link {
            right: 0;
            left: 0;
        }

        &:hover {
            transform: translate(#{rem(-5px)}, #{rem(5px)});

            #{ $self }__link {
                right: rem(-10px);
            }
        }
    }
}
</style>
