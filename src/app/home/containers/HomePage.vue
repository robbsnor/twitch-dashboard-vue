<script setup lang="ts">
import { useAuthStore } from '../../auth/stores/auth.store';
import { TitleService } from '../../shared/services/title.service';

const authStore = useAuthStore();
TitleService.setTitle('Home');
</script>

<template>
    <Section first class="splash">
        <div class="splash__container">
            <div class="splash__copy">
                <h1 class="splash__title">Twitch Dashboard</h1>
                <!-- <h3 class="splash__subtitle">Manage your favourite streamers</h3> -->

                <div class="splash__description">
                    <p>
                        Organize and filter your favourite streamers, easily re-watch previous streams in a clean
                        presentable UI.
                    </p>
                </div>

                <div class="flex gap-4">
                    <v-btn>Features</v-btn>
                    <v-btn v-if="authStore.user" to="/following/live">Dashboard</v-btn>
                    <v-btn v-else @click="authStore.signIn()" prepend-icon="twitch" color="primary">
                        Log in with Twitch
                    </v-btn>
                </div>
            </div>

            <div class="splash__image-container">
                <!--  -->
            </div>
        </div>
    </Section>
</template>

<style scoped lang="scss">
.splash {
    &__container {
    }

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
