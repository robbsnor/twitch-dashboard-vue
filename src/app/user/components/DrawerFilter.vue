<script setup lang="ts">
import ButtonGroup from '../../shared/components/ButtonGroup.vue';
import Button from '../../shared/components/Button.vue';
import { ref } from 'vue';


const emit = defineEmits(['toggleDrawer']);

const _videoTypes = ref();
const _spoilers = ref();
</script>

<template>
    <div class="filter-drawer">
        <div class="filter-drawer__section section">
            <h3 class="section__title">Category</h3>
            <div class="section__body">input</div>
        </div>

        <div class="filter-drawer__section section">
            <h3 class="section__title">Video types</h3>
            <div class="section__body">
                <div class="checkbox-group">
                    <Checkbox v-model="_videoTypes" inputId="streams" name="streams" value="streams" class="checkbox-group__checkbox" />
                    <label for="streams" class="checkbox-group__label">Streams</label>
                </div>

                <div class="checkbox-group">
                    <Checkbox v-model="_videoTypes" inputId="highlights" name="highlights" value="highlights" class="checkbox-group__checkbox" />
                    <label for="highlights" class="checkbox-group__label">Highlights</label>
                </div>

                <div class="checkbox-group">
                    <Checkbox v-model="_videoTypes" inputId="clips" name="clips" value="clips" class="checkbox-group__checkbox" />
                    <label for="clips" class="checkbox-group__label">Clips</label>
                </div>
            </div>
        </div>

        <div class="filter-drawer__section section">
            <h3 class="section__title">Spoilers</h3>
            <div class="section__body">
                <div class="checkbox-group">
                    <Checkbox v-model="_spoilers" inputId="show-time" name="show-time" value="show-time" class="checkbox-group__checkbox" />
                    <label for="show-time" class="checkbox-group__label">Show time</label>
                </div>

                <div class="checkbox-group">
                    <Checkbox v-model="_spoilers" inputId="show-thumbnail" name="show-thumbnail" value="show-thumbnail" class="checkbox-group__checkbox" />
                    <label for="show-thumbnail" class="checkbox-group__label">Show thumbnail</label>
                </div>
            </div>
        </div>

        <div class="filter-drawer__footer">
            <ButtonGroup>
                <Button color="secondary" @click="emit('toggleDrawer')">Cancel</Button>
                <Button @click="emit('toggleDrawer')">Apply</Button>
            </ButtonGroup>
        </div>
    </div>
</template>


<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

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
}

.checkbox-group {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 0;

    &__label {
        font-weight: bold;
    }
}
</style>

