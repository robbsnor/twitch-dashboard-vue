<script setup lang="ts">
import type { Form } from '../models/form.model';

const props = defineProps<{
    form: Form;
}>();
</script>

<template>
    <div class="filter-form">
        <h3 class="filter-form__title">Filter videos</h3>
        <div class="filter-form__section section">
            <h3 class="section__title">Type</h3>
            <div class="section__body">
                <v-btn-toggle v-model="props.form.type">
                    <v-btn value="all">All</v-btn>
                    <v-btn value="streams">Streams</v-btn>
                    <v-btn value="highlights">Highlights</v-btn>
                </v-btn-toggle>
            </div>
        </div>

        <div class="filter-form__section section">
            <h3 class="section__title">Spoilers</h3>
            <div class="section__body">
                <v-switch
                    v-model="props.form.showDuration"
                    label="Show duration"
                />
                <v-switch
                    v-model="props.form.showThumbnail"
                    label="Show thumbnail"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

// Temp
.v-input--density-default {
    --v-input-control-height: 20px;
}

.filter-form {
    background-color: $c-black-4;
    display: flex;
    flex-direction: column;
    gap: rem($padding * 2);

    &__title {
        padding: 0;
    }
}

.section {
    &__title {
        color: $c-black-16;
        font-size: rem(18px);
        padding-bottom: rem(16px);
    }

    &__body {
        .el-checkbox {
            display: flex;
        }
    }
}
</style>
