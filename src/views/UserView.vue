<script setup lang="ts">
import UserHeader from '../app/user/components/UserHeader.vue';
import TempTabs from '../app/user/components/TempTabs.vue';
import ButtonGroup from '../app/shared/components/ButtonGroup.vue';
import Button from '../app/shared/components/Button.vue';
import { LEKKER_SPELEN_VIDEOS } from '../app/user/data/lekkerspelen-videos.data';
import { computed, onMounted, ref } from 'vue';

const _drawer = ref(false)
const _category = ref();
const _search = ref();
const _videoTypes = ref();
const _spoilers = ref();
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
            label: category
        }
    })
})

onMounted(() => {
})
</script>

<template>
    <UserHeader />
    <TempTabs />

    <el-input
        v-model="_search"
        placeholder="Search videos..."
    >
        <template #suffix>
            <vue-feather @click="_drawer = true" type="heart"></vue-feather>
        </template>
    </el-input>

    <el-drawer
        v-model="_drawer"
        size="auto"
        direction="btt"
    >
        <template #header>
            <h4>Filter videos</h4>
        </template>

        <template #default>
            <div class="filter-drawer">
                <div class="filter-drawer__section section">
                    <h3 class="section__title">Category</h3>
                    <div class="section__body">
                        <el-select-v2
                            v-model="_category"
                            filterable
                            :options="_categoryOptions"
                            placeholder="Please select"
                        />
                    </div>
                </div>

                <div class="filter-drawer__section section">
                    <h3 class="section__title">Video types</h3>
                    <div class="section__body">
                        <el-checkbox v-model="_videoTypes" label="Streams" size="large" />
                        <el-checkbox v-model="_videoTypes" label="Highlights" size="large" />
                        <el-checkbox v-model="_videoTypes" label="Clips" size="large" />
                    </div>
                </div>

                <div class="filter-drawer__section section">
                    <h3 class="section__title">Spoilers</h3>
                    <div class="section__body">
                        <el-checkbox v-model="_spoilers" label="Show time" size="large" />
                        <el-checkbox v-model="_spoilers" label="Show thumbnail" size="large" />
                    </div>
                </div>

                <div class="filter-drawer__footer">
                </div>
            </div>
        </template>

        <template #footer>
            <ButtonGroup>
                <Button color="secondary">Cancel</Button>
                <Button>Apply</Button>
            </ButtonGroup>
        </template>
    </el-drawer>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.user {
    &__header {
        margin-top: -$header-height;
    }

    &__container {
        @include container
    }
}


.filter-drawer {
    &__section {
        padding-bottom: rem(30px);
    }

    &__footer {
        display: flex;
        justify-content: flex-end;
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


// @include screen(1400px) {
//     &__body {
//         grid-template-columns: repeat(5, 1fr);
//     }
// }
</style>
