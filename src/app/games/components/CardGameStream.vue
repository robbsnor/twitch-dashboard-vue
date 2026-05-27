<script setup lang="ts">
import { NumberService } from '@/app/shared/services/number.service';
import { computed } from 'vue';
import type { TwitchStreamsWithUser } from '@/app/shared/models/twitch/streams-with-user.model';
import { TwitchService } from '@/app/shared/services/twitch.service';

const props = defineProps<{
    stream: TwitchStreamsWithUser;
}>();
const viewers = computed(() => NumberService.abbreviateNumber(props.stream.viewer_count));
</script>

<template>
    <div class="card-game-stream" :data-user-id="stream.user_id">
        <a
            :href="`https://www.twitch.tv/${stream.user_login}`"
            target="_blank"
            class="card-game-stream__thumbnail-container"
        >
            <span class="sr-only">Watch {{ stream.display_name }}'s stream</span>
            <img
                :src="TwitchService.getStreamThumbnail(stream.thumbnail_url)"
                class="card-game-stream__thumbnail"
                alt="thumbnail"
            />
            <div class="card-game-stream__thumbnail-overlay"></div>
            <div class="card-game-stream__arrow">(icon)</div>
            <div class="card-game-stream__viewers">{{ viewers }}</div>
        </a>
        <div class="card-game-stream__title">{{ stream.title }}</div>
        <div class="card-game-stream__footer">
            <RouterLink :to="`/user/${stream.user_login}`" class="card-game-stream__user">
                <img :src="stream.profile_image_url" class="card-game-stream__avatar" alt="avatar" />
                <div class="card-game-stream__username">{{ stream.display_name }}</div>
            </RouterLink>
        </div>
        <div class="card-game-stream__tags">
            <v-chip
                v-for="tag in stream.tags"
                :key="tag"
                size="small"
                :href="`https://www.twitch.tv/directory/all/tags/${tag}`"
                target="_blank"
            >
                {{ tag }}
            </v-chip>
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
