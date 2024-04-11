<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Section from '../../shared/components/Section.vue';
import { useLiveStore } from '../stores/live.store';
import { TwitchService } from '@/app/shared/services/twitch.service';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import type { TwitchUser } from '@/app/shared/models/twitch/users.model';
import { UserFactory } from '../factories/user.factory';
import type { CardUserProps } from '../components/CardUser.vue';
import CardUser from '../components/CardUser.vue';

const twitchService = new TwitchService();

const favourtieStore = useFavouriteStore();
const liveStore = useLiveStore();

const _favChannels = ref<CardUserProps[]>();

onMounted(async () => {
    const res = await twitchService.getUsers({ids: favourtieStore.getFavourites()})
    _favChannels.value = UserFactory.mapToCardUser(res.data);
})
</script>

<template>
    <div class="users">
        <Section>
            <PageTabs :title="liveStore.pageTabs.title" :pages="liveStore.pageTabs.paths" />
        </Section>

        <Section title="Favourites">
            <div class="cards-user">
                <CardUser v-for="channel in _favChannels" :name="channel.name" :image="channel.image" />
            </div>

        </Section>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.cards-user {
    display: grid;
    gap: $padding;

    @include screen($desktop) {
        grid-template-columns: repeat(5, 1fr);
        gap: rem($padding);
        margin-left: 0;
        margin-right: 0;
    }
}
</style>
