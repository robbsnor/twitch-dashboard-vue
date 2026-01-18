<script setup lang="ts">
import { TitleService } from '@/app/shared/services/title.service';
import { useTwitchApi } from '@/app/shared/composables/useTwitchApi.composable';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import CardUser from '../components/CardUser.vue';

TitleService.setTitle('Users');

const favouriteStore = useFavouriteStore();
</script>

<template>
    <Section title="Favourites">
        <div class="user-cards" v-fade-stagger>
            <CardUser v-for="user in favouriteStore.twitchUsers" :user="user" :key="user.id" />
        </div>
    </Section>
</template>

<style scoped lang="scss">
.user-cards {
    display: grid;
    gap: $padding / 2;
    grid-template-columns: repeat(1, 1fr);

    @include screen($desktop) {
        grid-template-columns: repeat(6, 1fr);
        gap: rem($padding);
        margin-left: 0;
        margin-right: 0;
    }
}
</style>
