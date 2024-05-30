<script setup lang="ts">
import { TitleService } from '@/app/shared/services/title.service';
import { TwitchService } from '@/app/shared/services/twitch.service';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import { onMounted, ref } from 'vue';
import type { CardUserProps } from '../components/CardUser.vue';
import CardUser from '../components/CardUser.vue';
import { UserFactory } from '../factories/user.factory';

const twitchService = new TwitchService();
TitleService.setTitle('Users');

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
            <div class="user-cards">
                <CardUser v-for="channel in favouriteUsers" :name="channel.name" :image="channel.image" />
            </div>
        </Section>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.user-cards {
    display: grid;
    gap: $padding;

    @include screen($desktop) {
        grid-template-columns: repeat(6, 1fr);
        gap: rem($padding);
        margin-left: 0;
        margin-right: 0;
    }
}
</style>
