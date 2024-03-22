<script setup lang="ts">
import UserHeader from '../app/user/components/UserHeader.vue';
import TempTabs from '../app/user/components/TempTabs.vue';
import VueFeather from 'vue-feather';
import ButtonGroup from '../app/shared/components/ButtonGroup.vue';
import Button from '../app/shared/components/Button.vue';
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue';

const _showDrawer = ref(false);
const _videoTypes = ref();
const _spoilers = ref();

const toggleDrawer = () => _showDrawer.value = !_showDrawer.value;
</script>

<template>
    <div class="user">
        <UserHeader class="user__header" />

        <div class="user__container">
            <TempTabs />
            <VueFeather @click="toggleDrawer" type="arrow-down-right" />
        </div>

        <Sidebar
            v-model:visible="_showDrawer"
            header="Search"
            position="bottom"
            class="drawer-bottom-small"
        >
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
                        <Button color="secondary" @click="toggleDrawer">Cancel</Button>
                        <Button @click="toggleDrawer">Apply</Button>
                    </ButtonGroup>
                </div>
            </div>
        </Sidebar>
    </div>
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

// @include screen(1400px) {
//     &__body {
//         grid-template-columns: repeat(5, 1fr);
//     }
// }
</style>
