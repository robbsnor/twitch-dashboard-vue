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
                    size="large"
                    filterable
                    clearable
                    placeholder="Please select a category"
                />
            </div>
        </div>

        <div class="filter-form__section section">
            <h3 class="section__title">Video types</h3>
            <div class="section__body">
                <el-radio-group v-model="props.form.type" size="large">
                    <el-radio-button value="all" size="large">All</el-radio-button>
                    <el-radio-button value="archive" size="large">Streams</el-radio-button>
                    <el-radio-button value="highlight" size="large">Highlights</el-radio-button>
                </el-radio-group>
            </div>
        </div>

        <div class="filter-form__section section">
            <h3 class="section__title">Spoilers</h3>
            <div class="section__body">
                <el-switch v-model="props.form.showTime" active-text="Show time" />
                <br />
                <el-switch v-model="props.form.showThumbnails" active-text="Show thumbnails" />
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
