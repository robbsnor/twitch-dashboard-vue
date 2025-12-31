<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    categories?: string[];
}>();

const filter = defineModel<string | null>("filter");
const filterEl = ref<HTMLDivElement | any>();

const scrollToFilter = () => {
    const yOffset = -120;
    const y = filterEl.value.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
};

watch(filter, () => {
    if (!filter.value) return;
    // scrollToFilter();
});
</script>

<template>
    <div style=" display: flex; justify-content: center; align-items: center; position: relative; gap: 4px">
        <v-combobox
            class="filter__search"
            v-model="filter"
            :items="props.categories"
            placeholder="Search streams..."
            :clearable="false"
            eager
            ref="filterEl"
        />

        <v-btn v-if="filter" icon="mdi-close" variant="text" @click="filter = null" color="#ccc" />
    </div>
</template>
