<script setup lang="ts">
import { defineModel } from 'vue';
import { useAppOptionsStore } from '../stores/AppOptions.store';

const appOptionsStore = useAppOptionsStore();
const dialog = defineModel<boolean>('dialog');
</script>

<template>
    <Dialog
        class="app-options-dialog"
        v-model:dialog="dialog"
        title="App settings"
        description="Customize the behaviour of the App."
        :width="400"
    >

        <div class="app-options-dialog__section">
            <h4>General:</h4>
            <v-text-field
                v-model="appOptionsStore.options.app.vodDownloadURL"
                label="VOD downloader URL:"
                variant="solo"
            />
        </div>

        <div class="app-options-dialog__section">
            <h4>User profile:</h4>
            <v-switch
                v-model="appOptionsStore.options.user.showThumbnail"
                label="Show thumbnails"
                @click="appOptionsStore.toggleUserShowThumbnail"
            />
            <v-switch
                v-model="appOptionsStore.options.user.showDuration"
                label="Show duration"
                @click="appOptionsStore.toggleUserShowDuration"
            />
        </div>
    </Dialog>
</template>

<style scoped lang="scss">
.app-options-dialog {
    width: 500px;
    padding: 20px;

    &__section {
        margin-bottom: 20px;
    }
}
</style>
