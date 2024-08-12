<script setup lang="ts">
import { NumberService } from "@/app/shared/services/number.service";
import { useClipboard } from "@vueuse/core";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import type {
    CardLive as CardLiveModel,
    CardLiveSize,
} from "../models/card-live.model";

const toast = useToast();
const router = useRouter();

const emits = defineEmits({
    "click:filter-game": (game: string) => true,
});

interface Props {
    card: CardLiveModel;
    size?: CardLiveSize;
}

const props = withDefaults(defineProps<Props>(), {
    size: "normal",
});

const copyUserId = (card: CardLiveModel) => {
    const { copy, copied } = useClipboard();
    copy(card.userId.toString());
    toast.success(`Copied ID: ${card.userId}`, { duration: 3000 });
};

const goToGamePage = (game: string) => {
    router.push({ name: "game", params: { gameName: game } });
};

const viewers = computed(() => {
    return NumberService.abbreviateNumber(props.card.viewers);
});
</script>

<template>
    <!-- small -->
    <div v-if="size === 'small'" class="card-small">
        <div class="card-small__thumbnail-container">
            <div class="card-small__gradient"></div>
            <div class="card-small__viewers">{{ viewers }}</div>
            <!-- <button app-icon-button (click)="handleOptionsClick(card)" icon="more-vertical" hoverColor="black" size="small" class="card-small__options"></button> -->
            <img
                :src="card.thumbnail"
                class="card-small__thumbnail"
                alt="thumbnail"
            />
        </div>
        <div class="card-small__info">
            <div class="card-small__title">{{ card.title }}</div>
            <div class="card-small__game-container">
                <a
                    class="card-small__game"
                    @click.prevent="emits('click:filter-game', card.game)"
                    >{{ card.game }}</a
                >
            </div>
            <RouterLink :to="`/user/${card.name}`" class="card-small__user">
                <img
                    v-if="card.avatar"
                    :src="card.avatar"
                    class="card-small__avatar"
                    alt="avatar"
                />
                <div class="card-small__username">{{ card.name }}</div>
            </RouterLink>
        </div>
        <a
            :href="card.link"
            target="_blank"
            class="card-small__link"
            :data-user-id="card.userId"
            ><span class="sr-only">Watch {{ card.name }}'s stream</span></a
        >
    </div>

    <!-- normal -->
    <div
        v-if="size === 'normal'"
        class="card-normal"
        :data-user-id="card.userId"
    >
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
            <v-menu location="top right">
                <template #activator="{ props }">
                    <v-btn
                        class="card-normal__options"
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

    <!-- fancy -->
    <div v-if="size === 'fancy'" class="card-fancy">
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
        <!-- <button app-icon-button (click)="handleOptionsClick(card)" icon="more-vertical" hoverColor="black" class="card-fancy__options"></button> -->
        <a
            :href="card.link"
            target="_blank"
            class="card-fancy__link"
            :data-user-id="card.userId"
            ><span class="sr-only">Watch {{ card.name }}'s stream</span></a
        >
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

    &__gradient {
        background: linear-gradient(
            -70deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 50%
        );
        // background-color: red;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    &__viewers {
        position: absolute;
        bottom: rem(5px);
        right: rem(8px);
        font-size: rem(14px);
        color: $c-white--dark;
        line-height: 1;
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
        z-index: 1;
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
                color: $c-black-16;
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
        color: $c-black-14;
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

    &__options {
        position: absolute;
        right: rem(-13px);
        bottom: rem(7px);
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
    }

    @include screen(800px) {
        &__thumbnail {
            max-width: 100%;
            margin-left: 0;
            border-radius: $border-radius-normal;
        }

        &__options {
            bottom: rem($padding * 0.5);
            right: rem($padding * 0.25);
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
