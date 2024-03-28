<script setup lang="ts">
import { ref } from "vue";

const pizza = ref();
const visible = ref(true);
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
    <Button icon="pi pi-arrow-right" @click="visible = true" />

    <Sidebar v-model:visible="visible" header="Sidebar" position="bottom">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" placeholder="Select Cities" :maxSelectedLabels="3" class="w-full md:w-20rem" />

        <div class="card flex flex-wrap justify-content-center gap-3">
            <div class="flex align-items-center">
                <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
                <label for="ingredient1" class="ml-2"> Cheese </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="pizza" inputId="ingredient2" name="pizza" value="Mushroom" />
                <label for="ingredient2" class="ml-2"> Mushroom </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="pizza" inputId="ingredient3" name="pizza" value="Pepper" />
                <label for="ingredient3" class="ml-2"> Pepper </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="pizza" inputId="ingredient4" name="pizza" value="Onion" />
                <label for="ingredient4" class="ml-2"> Onion </label>
            </div>
        </div>
    </Sidebar>

    <div class="card flex flex-wrap justify-content-center gap-3">
        <div class="flex align-items-center">
            <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
            <label for="ingredient1" class="ml-2"> Cheese </label>
        </div>
        <div class="flex align-items-center">
            <Checkbox v-model="pizza" inputId="ingredient2" name="pizza" value="Mushroom" />
            <label for="ingredient2" class="ml-2"> Mushroom </label>
        </div>
        <div class="flex align-items-center">
            <Checkbox v-model="pizza" inputId="ingredient3" name="pizza" value="Pepper" />
            <label for="ingredient3" class="ml-2"> Pepper </label>
        </div>
        <div class="flex align-items-center">
            <Checkbox v-model="pizza" inputId="ingredient4" name="pizza" value="Onion" />
            <label for="ingredient4" class="ml-2"> Onion </label>
        </div>
    </div>
</template>

<style></style>
