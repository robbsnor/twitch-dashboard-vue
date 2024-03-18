<script setup lang="ts">
import { ref } from "vue";
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';
import Card from 'primevue/card';
import Button from 'primevue/button';

const value = ref(50);
const selectedCities = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

</script>

<template>
 <div class="card flex justify-content-center">
        <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" placeholder="Select Cities"
            :maxSelectedLabels="3" class="w-full md:w-20rem" />
    </div>

    <div class="card flex justify-content-center">
        <div class="w-14rem">

            <InputText v-model.number="value" class="w-full mb-3" />
            <Slider v-model="value" class="w-full" />
        </div>
    </div>

    <Card style="width: 25rem; overflow: hidden">
    <template #header>
        <img alt="user header" />
    </template>
    <template #title>Advanced Card</template>
    <template #subtitle>Card subtitle</template>
    <template #content>
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
    </template>
    <template #footer>
        <div class="flex gap-3 mt-1">
            <Button label="Cancel" severity="secondary" outlined class="w-full" />
            <Button label="Save" class="w-full" />
        </div>
    </template>
</Card>
</template>

<style></style>
