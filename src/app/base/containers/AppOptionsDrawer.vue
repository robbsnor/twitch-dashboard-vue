<script setup lang="ts">
import { defineModel } from 'vue';
import { useAppOptionsStore } from '../stores/AppOptions.store';

const appOptionsStore = useAppOptionsStore();
const drawer = defineModel<boolean>('drawer');
</script>

<template>
    <v-navigation-drawer v-model="drawer" temporary floating location="right" class="app-options-drawer">
        <label>User profile:</label>

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
    </v-navigation-drawer>
</template>

<style scoped lang="scss">
.app-options-drawer {
    width: 500px;
    padding: 20px;
}
</style>
