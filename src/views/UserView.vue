<script setup lang="ts">
import UserHeader from '../app/user/components/UserHeader.vue';
import TempTabs from '../app/user/components/TempTabs.vue';
import FilterForm from '../app/user/components/FilterForm.vue';
import { onMounted, ref, watch } from 'vue';
import type { FormModel } from '../app/user/models/form.model';
import type { CardVideoModel } from '../app/user/models/card-video.model';
import { TwitchService } from '../app/shared/services/twitch.service';
import { CardVideoFactory } from '../app/user/factories/card-video.factory';
import CardVideo from '../app/user/components/CardVideo.vue';
import type { VideoTypesModel } from '../app/shared/models/twitch/video-types.model';

const twitchService = new TwitchService();

const _drawer = ref(false);
const _form = ref<FormModel>({
    search: '',
    category: '',
    type: 'all',
    spoilers: [],
})
const _cards = ref<CardVideoModel[]>([]);

const getCards = async (types: VideoTypesModel) => {
    const res = await twitchService.getVideosByUserId(52385053, types);
    const videos = res.data;
    _cards.value = CardVideoFactory.mapFromTwitchVideo(videos);
}

onMounted(async () => {
    getCards('all');
})

watch(_form, async (newForm) => {
    getCards(newForm.type);
}, { deep: true });
</script>

<template>
    <div class="user">
        <UserHeader class="user__header" />

        <div class="user__container">
            <TempTabs />
            <el-input v-model="_form.search" placeholder="Search videos..." clearable></el-input>
            <vue-feather @click="_drawer = true" type="heart"></vue-feather>

            <code style="min-height: 250px; margin: 20px 0">
                {{ _form }}
            </code>

            <div class="user__cards">
                <CardVideo
                    v-for="card in _cards"
                    :key="card.id"
                    :card="card"
                    :hideTime="!_form.spoilers.find(spoiler => spoiler === 'hide-time')"
                    :hideThumbnail="!_form.spoilers.find(spoiler => spoiler === 'hide-thumbnail')"
                />
            </div>
        </div>
    </div>

    <!-- drawer -->
    <el-drawer v-model="_drawer" size="auto" direction="btt" title="Filter videos">
        <template #default>
            <FilterForm :form="_form"/>
        </template>
    </el-drawer>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.user {
    $self: &;

    &__header {
        margin-top: -$header-height;
    }

    &__container {
        @include container;
    }

    &__search {
        display: flex;
        gap: rem($padding);
    }

    &__cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: rem($padding * 2) rem($padding);
    }

    // @include screen(800px) {
    //
    // }
}


</style>
