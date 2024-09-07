<script setup lang="ts">
import { NumberService } from "@/app/shared/services/number.service";
import { computed } from "vue";
import type { CardGameStream as CardGameStreamModel } from "@/app/games/models/card-game-stream.model";

interface Props {
    card: CardGameStreamModel;
}

const props = defineProps<Props>();

const viewers = computed(() => {
    return NumberService.abbreviateNumber(props.card.viewers);
});
</script>

<template>
    <div class="card-game-stream" :data-user-id="card.userId">
        <a
            :href="card.link"
            target="_blank"
            class="card-game-stream__thumbnail-container"
        >
            <span class="sr-only">Watch {{ card.name }}'s stream</span>
            <v-img
                :src="card.thumbnail"
                class="card-game-stream__thumbnail"
                alt="thumbnail"
            />
            <div class="card-game-stream__thumbnail-overlay"></div>
            <div class="card-game-stream__arrow">(icon)</div>
            <div class="card-game-stream__viewers">{{ viewers }}</div>
        </a>
        <div class="card-game-stream__title">{{ card.title }}</div>
        <div class="card-game-stream__footer">
            <RouterLink
                :to="`/user/${card.name}`"
                class="card-game-stream__user"
            >
                <v-img
                    v-if="card.avatar"
                    :src="card.avatar"
                    class="card-game-stream__avatar"
                    alt="avatar"
                />
                <div class="card-game-stream__username">{{ card.name }}</div>
            </RouterLink>
        </div>
        <div class="card-game-stream__tags">
            <v-chip v-for="tag in card.tags" :key="tag" size="small">{{ tag }}</v-chip>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card-game-stream {
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
        color: $c-primary;
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

    &__title {
        @include line-clamp(1);
        flex-shrink: 0;
        padding: rem(12px) 0 0;
        color: $c-white;
        word-break: break-word;
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
        width: rem(35px);
        height: rem(35px);
        border-radius: 999px;
        margin-right: rem(10px);
    }

    &__username {
        color: $c-black-14;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: rem(5px);
        padding-top: rem(5px);
    }
}
</style>
