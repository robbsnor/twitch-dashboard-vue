<script setup lang="ts">
import { NumberService } from "@/app/shared/services/number.service";
import { computed, ref } from "vue";
import CardLiveOptions from "./CardLiveOptions.vue";
import type {
    CardLive as CardLiveModel,
    CardLiveSize,
} from "../models/card-live.model";
import { TimeService } from "@/app/shared/services/time.service";

const sheet = ref(false);

const props = withDefaults(defineProps<{
    card: CardLiveModel;
    size?: CardLiveSize;
}>(), {
    size: "normal",
});

const filter = defineModel<string>('filter');

const viewers = computed(() => {
    return NumberService.abbreviateNumber(props.card.viewers);
});

const uptime = computed(() => TimeService.formatUptime(props.card.startedAt));

</script>

<template>
    <!-- small -->
    <div v-if="size === 'small'" class="card-small">
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
                    <v-img :src="card.thumbnailLarge" alt="" class="bs__thumbnail" eager />
                    <CardLiveOptions
                        :game="card.game"
                        :username="card.name"
                        :userId="card.userId"
                        :isFavourite="false"
                        v-model:filter="filter"
                        v-model:sheet="sheet"
                    />
                </div>
            </v-bottom-sheet>
            <img
                :src="card.thumbnail"
                class="card-small__thumbnail"
                alt="thumbnail"
            />
        </div>
        <div class="card-small__info">
            <div class="card-small__title">{{ card.title }}</div>
            <div class="card-small__game-container">
                <div class="card-small__game">{{ card.game }}</div>
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
        >
            <span class="sr-only">Watch {{ card.name }}'s stream</span>
        </a>
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
                    :game="card.game"
                    :username="card.name"
                    :userId="card.userId"
                    :isFavourite="false"
                    v-model:filter="filter"
                />
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
                :game="card.game"
                :username="card.name"
                :userId="card.userId"
                :isFavourite="true"
                :showFilterBy="false"
                v-model:filter="filter"
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
        background: linear-gradient(-45deg, rgba(0, 0, 0, .8) 0%, rgba(0, 0, 0, 0) 50%);
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

.bs {
    &__thumbnail {
        border-radius: rem($border-radius-large) rem($border-radius-large) 0 0;
    }
}
</style>
