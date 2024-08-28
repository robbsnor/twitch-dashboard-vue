<script setup lang="ts">
import { ref } from "vue";
import { TabOption } from "../../shared/components/Tab.vue";

const options = ref<TabOption[]>([
    {
        value: '1',
        text: 'Option 1',
        preIcon: 'mdi-heart',
    },
    {
        value: '2',
        text: 'Option 2',
        preIcon: 'mdi-star',
    },
    {
        value: '3',
        text: 'Option 3',
    },
    {
        value: '4',
        text: 'Option 4',
    },
    {
        value: '5',
        text: 'Option 5',
        preIcon: 'mdi-star',
    },
]);
</script>

<template>
    <div class="playground">
        <Section title="Playground">

            <Tab :options="options"></Tab>

        </Section>
    </div>
</template>

<style scoped lang="scss">
.playground {}
</style>
