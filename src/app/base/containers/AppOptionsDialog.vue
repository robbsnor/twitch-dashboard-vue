<script setup lang="ts">
import { defineModel } from 'vue';
import { useAppOptionsStore } from '../stores/AppOptions.store';

const appOptionsStore = useAppOptionsStore();
const dialog = defineModel<boolean>('dialog');
</script>

<template>
    <Dialog v-model:dialog="dialog" title="App settings">
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
    </Dialog>
</template>

<style scoped lang="scss">
.app-options-dialog {
    width: 500px;
    padding: 20px;
}
</style>
