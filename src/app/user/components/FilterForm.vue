<script setup lang="ts">
import { ref, computed } from 'vue';
import { LEKKER_SPELEN_VIDEOS } from '../data/lekkerspelen-videos.data';
import type { FormModel } from '../models/form.model';

const props = defineProps<{
    form: FormModel;
}>()

const _additionalVideoInfo = ref(LEKKER_SPELEN_VIDEOS);

const _categories = computed(() => {
    const duplicateCategories = _additionalVideoInfo.value.map((video) => video.chapters.map(chapter => chapter.title))
    const orderedCategories = [...new Set(duplicateCategories.flat())].filter(category => category !== "").sort();
    return orderedCategories;
})

const _categoryOptions = computed(() => {
    return _categories.value.map((category) => {
        return {
            value: category,
            label: category,
        }
    })
})
</script>

<template>
    <div class="filter-form">
        <div class="filter-form__section section">
            <h3 class="section__title">Category</h3>
            <div class="section__body">
                <el-select-v2
                    v-model="props.form.category"
                    :options="_categoryOptions"
                    filterable
                    clearable
                    placeholder="Please select a category"
                />
            </div>
        </div>

        <div class="filter-form__section section">
            <h3 class="section__title">Video types</h3>
            <div class="section__body">
                <el-radio-group v-model="props.form.type">
                    <el-radio value="all" size="large">All</el-radio>
                    <el-radio value="archive" size="large">Streams</el-radio>
                    <el-radio value="highlight" size="large">Highlights</el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="filter-form__section section">
            <h3 class="section__title">Spoilers</h3>
            <div class="section__body">
                <el-checkbox-group v-model="props.form.spoilers">
                    <el-checkbox value="hide-time" label="Hide time" size="large" />
                    <el-checkbox value="hide-thumbnail" label="Hide thumbnail" size="large" />
                </el-checkbox-group>
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
