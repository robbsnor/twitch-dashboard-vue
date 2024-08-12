<script setup lang="ts">
import { computed } from "vue";

export interface CardModel {
    thumnail: string;
    link: string;
    text: {
        top: {
            left: string;
            right: string;
        };
        bottom: {
            left: string;
            right: string;
        };
    };
}

const props = defineProps<{
    card: CardModel;
    modifier: string;
}>();

const cssClass = computed(() => {
    return {
        card: true,
        [`card--${props.modifier}`]: !!props.modifier,
    };
});
</script>

<template>
    <div v-if="size === 'normal'" :class="cssClass">
        <a :href="card.link" target="_blank" class="card__thumbnail-container">
            <span class="sr-only">Watch {{ card.name }}'s stream</span>
            <img
                :src="card.thumbnail"
                class="card__thumbnail"
                alt="thumbnail"
            />
            <div class="card__thumbnail-overlay"></div>
            <div class="card__arrow">(icon)</div>
            <div class="card__viewers">{{ viewers }}</div>
        </a>
        <div class="card__title">{{ card.title }}</div>
        <div class="card__game">{{ card.game }}</div>
        <div class="card__footer">
            <RouterLink :to="`/user/${card.name}`" class="card__user">
                <img
                    v-if="card.avatar"
                    :src="card.avatar"
                    class="card__avatar"
                    alt="avatar"
                />
                <div class="card__username">{{ card.name }}</div>
            </RouterLink>
            <v-menu location="top right">
                <template #activator="{ props }">
                    <v-btn
                        class="card__options"
                        v-bind="props"
                        icon="mdi-dots-vertical"
                        size="small"
                    />
                </template>
                <v-list>
                    <v-list-item
                        prepend-icon="mdi-magnify"
                        @click="goToGamePage(card.game)"
                        >Search streams: <b>'{{ card.game }}'</b></v-list-item
                    >
                    <v-list-item
                        prepend-icon="mdi-filter-variant"
                        @click.prevent="emits('click:filter-game', card.game)"
                        >Filter by: <b>'{{ card.game }}'</b></v-list-item
                    >
                    <Divider />
                    <v-list-item
                        prepend-icon="mdi-content-copy"
                        @click="copyUserId(card)"
                        >Copy userID</v-list-item
                    >
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
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
        bottom: rem(7px);
        right: rem(10px);
        color: $c-white--dark;
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
                color: $c-black-16;
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
        color: $c-black-14;
    }

    &__options {
        opacity: 0;
        transition: 0.2s;
        transform: translateX(10px);
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

    @include screen(800px) {
        &:hover {
            #{ $self }__options {
                opacity: 1;
            }
        }
    }
}
</style>
