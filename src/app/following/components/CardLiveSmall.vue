<script setup lang="ts">
import { computed, ref } from 'vue';
import { CardLiveService } from '../services/card-live.service';
import type { CardLive as CardLiveModel } from '../models/card-live.model';
import CardLiveOptions from './CardLiveOptions.vue';

const props = defineProps<{
    card: CardLiveModel;
}>();

const filter = defineModel<string>('filter');
const sheet = ref(false);

const cssClass = computed(() => {
    return {
        'card-small': true,
    };
});

const viewers = computed(() => CardLiveService.getViewers(props.card.viewers));
</script>

<template>
    <div :class="cssClass">
        <div class="card-small__thumbnail-container">
            <div class="card-small__viewers">{{ viewers }}</div>

            <v-bottom-sheet v-model="sheet" inset>
                <template v-slot:activator="{ props }">
                    <v-btn
                        class="card-small__options"
                        v-bind="props"
                        variant="text"
                        icon="mdi-dots-vertical"
                        size="small"
                    />
                </template>

                <div class="bs">
                    <v-img :src="card.thumbnail" alt="" class="bs__thumbnail" eager />

                    <div style="background-color: rgba(0, 0, 0, 0.8); padding: 16px; padding-bottom: 4px">
                        <div style="color: white; margin-bottom: 4px">
                            {{ card.title }}
                        </div>
                        <div style="font-size: 1rem">
                            {{ CardLiveService.getUptime(card.startedAt) }}
                        </div>
                    </div>

                    <CardLiveOptions
                        v-model:filter="filter"
                        v-model:sheet="sheet"
                        :game="card.game"
                        :username="card.name"
                        :userId="card.userId"
                        :isFavourite="false"
                    />
                </div>
            </v-bottom-sheet>

            <img :src="card.thumbnail" class="card-small__thumbnail" alt="thumbnail" />
        </div>

        <div class="card-small__info">
            <div class="card-small__title">{{ card.title }}</div>

            <div v-if="card.game" class="card-small__game-container">
                <div class="card-small__game">{{ card.game }}</div>
            </div>

            <RouterLink :to="`/user/${card.name}`" class="card-small__user">
                <img v-if="card.avatar" :src="card.avatar" class="card-small__avatar" alt="avatar" />

                <div class="card-small__username">{{ card.name }}</div>
            </RouterLink>
        </div>

        <a :href="card.link" target="_blank" class="card-small__link">
            <span class="sr-only">Watch {{ card.name }}'s stream</span>
        </a>
    </div>
</template>

<style scoped lang="scss">
.card-small {
    $self: &;

    position: relative;
    display: grid;
    grid-template-columns: rem(150px) 1fr;
    padding: rem(10px) rem(20px);
    transition: 0.2s;

    &__thumbnail-container {
        position: relative;
        margin-right: rem(16px);
        flex-shrink: 0;
        flex-grow: 0;
        aspect-ratio: 16 / 9;
    }

    &__thumbnail {
        width: 100%;
        height: 100%;
        border-radius: $border-radius-normal;
    }

    &__info {
        overflow: hidden;
    }

    &__viewers {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        aspect-ratio: 1 / 1;
        background: linear-gradient(-45deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%);
        pointer-events: none;
        position: absolute;
        height: 60px;
        aspect-ratio: 1 / 1;
        padding: rem(5px) rem(8px);
        color: $c-white--dark;
        font-size: rem(14px);
    }

    &__options {
        position: absolute;
        top: rem(-5px);
        right: rem(-5px);
        z-index: 1;
    }

    &__title {
        @include line-clamp(1);
        flex-shrink: 0;
        color: $c-white;
        font-size: rem(16px);
        margin-bottom: rem(5px);
        word-break: break-word;
    }

    &__game-container {
        // wrapper, so that the '&__game' can be inline-block :)
    }

    &__game {
        @include line-clamp(1);
        display: inline-block;
        position: relative;
        color: $c-white--dark;
        font-size: rem(16px);
        padding-bottom: rem(2px);
    }

    &__user {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: rem(10px);
        font-size: rem(16px);
        text-decoration: none;
        z-index: 1;

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
    }

    &__username {
        color: $c-primary;
    }

    &__link {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    &--primary {
        #{ $self }__username {
            color: $c-primary;
        }
    }

    &--yellow {
        #{ $self }__username {
            color: $c-yellow;
        }
    }

    &--orange {
        #{ $self }__username {
            color: $c-orange;
        }
    }

    &--red {
        #{ $self }__username {
            color: $c-red;
        }
    }

    &--purple {
        #{ $self }__username {
            color: $c-purple;
        }
    }

    &--blue {
        #{ $self }__username {
            color: $c-blue;
        }
    }

    &:hover {
        background-color: $c-black-4;
    }
}

.bs {
    &__thumbnail {
        border-radius: rem($border-radius-large) rem($border-radius-large) 0 0;
    }
}
</style>
