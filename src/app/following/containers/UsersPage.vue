<script setup lang="ts">
import { TitleService } from "@/app/shared/services/title.service";
import { TwitchApiService } from "@/app/shared/services/twitch-api.service";
import { useFavouriteStore } from "@/app/shared/stores/favourites.store";
import { onMounted, ref } from "vue";
import type { CardUserProps } from "../components/CardUser.vue";
import CardUser from "../components/CardUser.vue";
import { UserFactory } from "../factories/user.factory";

TitleService.setTitle("Users");
const twitchApiService = new TwitchApiService();

const favouriteStore = useFavouriteStore();

const favouriteUsers = ref<CardUserProps[]>();

onMounted(async () => {
    const res = await twitchApiService.getUsers({
        ids: favouriteStore.favouriteStreamerIds,
    });
    favouriteUsers.value = UserFactory.mapToCardUser(res.data);
});
</script>

<template>
    <Section title="Favourites">
        <div v-if="favouriteUsers" class="user-cards" v-fade-stagger>
            <CardUser
                v-for="user in favouriteUsers"
                :name="user.name"
                :avatar="user.avatar"
                :backgroundImage="user.backgroundImage"
                :key="user.name"
            />
        </div>

        <Spinner v-else padding />
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
