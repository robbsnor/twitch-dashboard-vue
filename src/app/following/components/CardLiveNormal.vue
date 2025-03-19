<script setup lang="ts">
import { computed, ref } from 'vue';
import { CardLiveService } from '../services/card-live.service';
import type { CardLive as CardLiveModel } from "../models/card-live.model";
import CardLiveOptions from "./CardLiveOptions.vue";
import AddFavouriteDialog from './AddFavouriteDialog.vue';

const props = defineProps<{
    card: CardLiveModel;
}>();

const filter = defineModel<string>('filter');

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

const openFavouriteDialog = () => favDialog.value = true;
</script>

<template>
    <div :class="cssClass" :data-user-id="card.userId">
        <a
            :href="card.link"
            target="_blank"
            class="card-normal__thumbnail-container"
        >
            <span class="sr-only">Watch {{ card.name }}'s stream</span>
            <img
                :src="card.thumbnail"
                class="card-normal__thumbnail"
                alt="thumbnail"
            />
            <div class="card-normal__thumbnail-overlay"></div>
            <div class="card-normal__arrow">(icon)</div>
            <div class="card-normal__viewers">{{ viewers }}</div>
            <div class="card-normal__uptime">{{ uptime }}</div>
        </a>

        <div class="card-normal__title">{{ card.title }}</div>
        <div class="card-normal__game">{{ card.game }}</div>

        <div class="card-normal__footer">
            <RouterLink :to="`/user/${card.name}`" class="card-normal__user">
                <img
                    v-if="card.avatar"
                    :src="card.avatar"
                    class="card-normal__avatar"
                    alt="avatar"
                />
                <div class="card-normal__username">{{ card.name }}</div>
            </RouterLink>

            <v-menu location="bottom right" origin="overlap">
                <template #activator="{ props }">
                    <v-btn
                        class="card-normal__options"
                        v-bind="props"
                        variant="text"
                        icon="mdi-dots-vertical"
                        size="small"
                    />
                </template>

                <CardLiveOptions
                    v-model:filter="filter"
                    :game="card.game"
                    :username="card.name"
                    :userId="card.userId"
                    :isFavourite="false"
                    @add-favourite="openFavouriteDialog()"
                />
            </v-menu>
        </div>
    </div>

    <AddFavouriteDialog v-model:dialog="favDialog" :user="userForAddFavourite" />
</template>

<style scoped lang="scss">
.card-normal {
    $self: &;

    &__thumbnail-container {
        display: block;
        position: relative;
        aspect-ratio: 16 / 9;
        transition: 0.2s;
        background-color: black;

        &:hover {
            transform: translate(#{rem(-5px)}, #{rem(5px)});

            #{ $self }__arrow {
                opacity: 1;
                transform: translate(#{rem(10px)}, #{rem(-10px)});
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

    &__viewers {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        aspect-ratio: 1 / 1;
        background: linear-gradient(-45deg, rgba(0, 0, 0, .8) 0%, rgba(0, 0, 0, 0) 50%);
        pointer-events: none;
        position: absolute;
        height: 150px;
        aspect-ratio: 1 / 1;
        padding: rem(7px) rem(10px);
        color: $c-white--dark;
    }

    &__uptime {
        opacity: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: flex-end;
        aspect-ratio: 1 / 1;
        background: linear-gradient(45deg, rgba(0, 0, 0, .8) 0%, rgba(0, 0, 0, 0) 50%);
        pointer-events: none;
        position: absolute;
        height: 150px;
        aspect-ratio: 1 / 1;
        padding: rem(7px) rem(10px);
        color: $c-white--dark;
        opacity: 0;
        transition: .2s;
    }

    &__thumbnail {
        width: 100%;
        height: 100%;
        border-radius: $border-radius-normal;
        transition: 0.2s;
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

    &__info {
        overflow: hidden;
        padding-top: rem(10px);
    }

    &__title {
        @include line-clamp(1);
        flex-shrink: 0;
        padding: rem(12px) 0 0;
        color: $c-white;
        word-break: break-word;
    }

    &__game {
        padding: rem(4px) 0 0;
        font-size: rem(16px);
        color: $c-white--dark;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__user {
        display: flex;
        align-items: center;
        color: $c-black-14;
        font-size: rem(18px);
        padding: rem(7px) 0;

        // text overlow doenst work
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        &:hover {
            #{ $self }__username {
                color: $c-primary--lighter;
            }
        }
    }

    &__avatar {
        display: block;
        width: rem(25px);
        height: rem(25px);
        border-radius: 999px;
        margin-right: rem(10px);
    }

    &__username {
        color: $c-primary;
    }

    &__options {
        // opacity: 0;
        transition: 0.2s;
        transform: translateX(10px);
    }

    &:hover {
        #{ $self }__uptime {
            opacity: 1;
        }
    }

    @include screen(800px) {
        &:hover {
            #{ $self }__options {
                opacity: 1;
            }
        }
    }
}
</style>
