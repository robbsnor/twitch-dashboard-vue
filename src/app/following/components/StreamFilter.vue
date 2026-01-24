<script setup lang="ts">
import { computed } from 'vue';
import { useFollowingStore } from '../stores/following.store';

const followingStore = useFollowingStore();
const appendIcon = computed(() => (!!followingStore.filter ? 'mdi-close' : undefined));
</script>

<template>
    <v-combobox
        v-model="followingStore.filter"
        :items="followingStore.categoriesList"
        placeholder="Search..."
        :clearable="false"
        :append-icon="appendIcon"
        @click:append="followingStore.filter = undefined"
        eager
        ref="filterEl"
        :class="{ 'pr-0.5': followingStore.filter }"
    />
</template>
