<script setup lang="ts">
import type { Form } from '../models/form.model';

const props = defineProps<{
    form: Form;
}>();
</script>

<template>
    <div class="filter-form">
        <div class="filter-form__section section">
            <h3 class="section__title">Video types</h3>
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
                    label="Show thumbnails"
                />
                <v-switch
                    v-model="props.form.showThumbnails"
                    label="Show thumbnails"
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

.filter-form {
    &__section {
        padding-bottom: rem(30px);
    }
}

.section {
    &__title {
        font-size: rem(18px);
        padding-bottom: rem(10px);
    }

    &__body {
        .el-checkbox {
            display: flex;
        }
    }
}
</style>
