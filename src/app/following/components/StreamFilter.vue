<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    categories?: string[];
}>();

const filter = defineModel<string | null>('filter');
const filterEl = ref<HTMLDivElement | any>();

const scrollToFilter = () => {
    const yOffset = -120;
    const y = filterEl.value.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
};

const appendIcon = computed(() => (!!filter ? 'mdi-close' : undefined));

watch(filter, () => {
    if (!filter.value) return;
    // scrollToFilter();
});
</script>

<template>
    <v-combobox
        class="filter__search"
        v-model="filter"
        :items="props.categories"
        placeholder="Search streams..."
        :clearable="false"
        :append-icon="appendIcon"
        eager
        ref="filterEl"
    />
</template>
