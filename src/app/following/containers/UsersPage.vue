<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useLiveStore } from '../stores/live.store';
import { TwitchService } from '@/app/shared/services/twitch.service';
import { useFavouriteStore } from '@/app/shared/stores/favourites.store';
import { UserFactory } from '../factories/user.factory';
import type { CardUserProps } from '../components/CardUser.vue';
import CardUser from '../components/CardUser.vue';
import { TitleService } from '@/app/shared/services/title.service';

const twitchService = new TwitchService();
TitleService.setTitle('Users');

const favourtieStore = useFavouriteStore();
const liveStore = useLiveStore();

const _favChannels = ref<CardUserProps[]>();

onMounted(async () => {
    const res = await twitchService.getUsers({ids: favourtieStore.getFavouriteStreamers()})
    _favChannels.value = UserFactory.mapToCardUser(res.data);
})
</script>

<template>
    <div class="users">
        <Section>
            <PageTabs :title="liveStore.pageTabs.title" :pages="liveStore.pageTabs.paths" />
        </Section>

        <Section title="Favourites">
            <div class="user-cards">
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
