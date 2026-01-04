<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useFollowingStore } from '../stores/following.store';

const props = defineProps<{
    categories?: string[];
}>();

const followingStore = useFollowingStore();

const appendIcon = computed(() => (!!followingStore.filter ? 'mdi-close' : undefined));
</script>

<template>
    <v-combobox
        v-model="followingStore.filter"
        :items="props.categories"
        placeholder="Search streams..."
        :clearable="false"
        :append-icon="appendIcon"
        @click:append="followingStore.filter = undefined"
        eager
        ref="filterEl"
    />
</template>
