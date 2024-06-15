<script setup lang="ts">
import { TitleService } from '@/app/shared/services/title.service';
import { TwitchService } from '@/app/shared/services/twitch.service';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import { onMounted, ref } from 'vue';
import type { CardUserProps } from '../components/CardUser.vue';
import CardUser from '../components/CardUser.vue';
import { UserFactory } from '../factories/user.factory';

TitleService.setTitle('Users');
const twitchService = new TwitchService();

const favouriteStore = useFavouriteStore();

const favouriteUsers = ref<CardUserProps[]>();

onMounted(async () => {
    const res = await twitchService.getUsers({ ids: favouriteStore.getFavouriteStreamers() });
    favouriteUsers.value = UserFactory.mapToCardUser(res.data);
});
</script>

<template>
    <div class="users">
        <Section title="Favourites">
            <div v-if="favouriteUsers" class="user-cards">
                <CardUser v-for="user in favouriteUsers" :name="user.name" :image="user.image" />
            </div>

            <Spinner v-else padding />
        </Section>
    </div>
</template>

<style scoped lang="scss">
.user-cards {
    display: grid;
    gap: $padding;
    grid-template-columns: repeat(1, 1fr);

    @include screen($desktop) {
        grid-template-columns: repeat(6, 1fr);
        gap: rem($padding);
        margin-left: 0;
        margin-right: 0;
    }
}
</style>
