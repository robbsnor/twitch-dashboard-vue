<script setup lang="ts">
import { useAuthStore } from '../../auth/stores/auth.store';
import { TitleService } from '../../shared/services/title.service';
import { TwitchService } from '@/app/shared/services/twitch.service';

const authStore = useAuthStore();
TitleService.setTitle('Home');

const singInUrl = TwitchService.getSignInURL();
</script>

<template>
    <Section class="splash">
        <div class="splash__container">
            <div class="splash__copy">
                <h1 class="splash__title">Twitch Dashboard</h1>
                <!-- <h3 class="splash__subtitle">Manage your favourite streamers</h3> -->

                <div class="splash__description">
                    <p>Organize and filter your favourite streamers, easily re-watch previous streams in a clean presentable UI.</p>
                </div>

                <ButtonGroup class="splash__buttons">
                    <Button color="secondary">Features</Button>

                    <RouterLink v-if="authStore.user" to="/following/live">
                        <Button >Dashboard</Button>
                    </RouterLink>

                    <a v-else :href="singInUrl">
                        <Button icon="twitch">Log in with Twitch</Button>
                    </a>
                </ButtonGroup>
            </div>

            <div class="splash__image-container">
                <!--  -->
            </div>
        </div>
    </Section>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.splash {
    padding-top: $header-height;

    &__container {}

    &__description {
        padding-bottom: rem(5px);
    }

    &__buttons {
        display: flex;
        flex-wrap: wrap;
        gap: rem(20px);
    }

    &__image-container {
        position: relative;
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
            @include container(rem($container-smaller-width));
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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
