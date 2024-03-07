<script setup lang="ts">
import Button from '@/components/shared/Button.vue';
import ButtonGroup from '@/components/shared/ButtonGroup.vue';
import { useAuthStore } from '@/stores/auth.store';
import { computed } from 'vue';

const authStore = useAuthStore();

const singInUrl = computed(() => {
    const url = new URL('https://id.twitch.tv/oauth2/authorize');
    url.searchParams.append('client_id', 'bpjttmchlxdfo9t47z8g3b7snhr9h4')
    url.searchParams.append('redirect_uri', window.location.href)
    url.searchParams.append('force_verify', 'true')
    url.searchParams.append('response_type', 'token')
    url.searchParams.append('scope', 'user:read:follows')

    return url.href;
})
</script>

<template>
    <section class="splash">
        <div class="splash__container">
            <div class="splash__copy">
                <h1 class="splash__title">Twitch Dashboard</h1>
                <h3 class="splash__subtitle">Manage your favourite streamers</h3>

                <div class="splash__description">
                    <p>Organize and filter your favourite streamers, easily re-watch previous streams in a clean presentable UI.</p>
                </div>

                <ButtonGroup class="splash__buttons">
                    <Button color="secondary">Features</Button>
                    <RouterLink v-if="authStore.user" to="/live">
                        <Button>Dashboard</Button>
                    </RouterLink>
                    <a v-else :href="singInUrl">
                        <Button icon="twitch">Log in with Twitch</Button>
                    </a>
                </ButtonGroup>
            </div>

            <div class="splash__image-container">
                <code>
                    {{  authStore.user }}
                </code>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.splash {
    &__container {
        @include container(rem($container-smaller-width));
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    &__subtitle {
        color: $c-gray;
        padding-bottom: 1.5rem;
    }

    &__description {
        margin-bottom: rem(50px);
    }

    &__buttons {
        display: flex;
        flex-wrap: wrap;
        gap: rem(20px);
    }

    &__image-container {
        position: relative;
        height: 500px;
        overflow: hidden;
        margin-right: rem(-$padding);
    }

    &__image {
        position: absolute;
        right: -100px;
        top: 100px;
        border: none;
    }

    @include screen(800px) {
        padding: rem(125px) 0;

        &__container {
            flex-direction: row;
        }

        &__copy {
            width: 100%;
            max-width: 53%;
        }

        &__image-container {
            height: unset;
            overflow: visible;
            margin-right: 0;
        }

        &__image {
            margin-top: rem(60px);
            position: static;
        }
    }
}
</style>
