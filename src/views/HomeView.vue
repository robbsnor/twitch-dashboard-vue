<script setup lang="ts">
// import Button from '../components/shared/Button.vue';
</script>

<template>
    <section class="splash">
        <h1>home</h1>
        <div class="splash__container">
            <div class="splash__copy">
                <h1 class="splash__title">Your Custom Twitch Dashboard</h1>
                <h3 class="splash__subtitle">Manage your favourite streamers</h3>

                <div class="splash__description">
                    <p>Organize and filter your favourite streamers, easily re-watch previous streams in a clean presentable UI.</p>
                </div>

                <div class="splash__buttons">
                    <!-- <Button icon="twitch">wow</Button> -->
                    <!-- <Button v-if="!session" type="a" @click="signInWithTwitch" icon="twitch">Sign in</Button> -->
                    <!-- <Button v-else type="button" @click="signOut">Sign out</Button> -->
                </div>
            </div>

            <div class="splash__image-container">
                <!-- <img src="/assets/images/arcade.png" alt="" class="splash__image"> -->
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
