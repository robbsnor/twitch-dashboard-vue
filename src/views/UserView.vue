<script setup lang="ts">
import UserHeader from '/src/app/user/components/UserHeader.vue';
import TempTabs from '/src/app/user/components/TempTabs.vue';
import VueFeather from 'vue-feather';
import Drawer from '/src/app/user/components/Drawer.vue';
import ButtonGroup from '../app/shared/components/ButtonGroup.vue';
import Button from '../app/shared/components/Button.vue';
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue';

const showDrawer = ref(false);

const toggleDrawer = () => showDrawer.value = !showDrawer.value;
</script>

<template>
    <div class="user">
        <UserHeader class="user__header" />

        <div class="user__container">
            <TempTabs />
            <VueFeather @click="toggleDrawer" type="arrow-down-right" />
        </div>

        <Drawer :show="showDrawer" maxWidth="500px" title="Search">
            <div class="filter-drawer">

                <div class="section">
                    <h3 class="section__title">Category</h3>
                    <div class="section__body">input</div>
                </div>

                <div class="section">
                    <h3 class="section__title">Video types</h3>
                    <div class="section__body">
                        <div class="checkbox-group">
                            <Checkbox inputId="streams" name="streams" value="streams" class="checkbox-group__checkbox" />
                            <label for="streams" class="checkbox-group__label">Streams</label>
                        </div>

                        <div class="checkbox-group">
                            <Checkbox inputId="highlights" name="highlights" value="highlights" class="checkbox-group__checkbox" />
                            <label for="highlights" class="checkbox-group__label">Highlights</label>
                        </div>

                        <div class="checkbox-group">
                            <Checkbox inputId="clips" name="clips" value="clips" class="checkbox-group__checkbox" />
                            <label for="clips" class="checkbox-group__label">Clips</label>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h3 class="section__title">Spoilers</h3>
                    <div class="section__body">
                        <div class="checkbox-group">
                            <Checkbox inputId="show-time" name="show-time" value="show-time" class="checkbox-group__checkbox" />
                            <label for="show-time" class="checkbox-group__label">Show time</label>
                        </div>

                        <div class="checkbox-group">
                            <Checkbox inputId="show-thumbnail" name="show-thumbnail" value="show-thumbnail" class="checkbox-group__checkbox" />
                            <label for="show-thumbnail" class="checkbox-group__label">Show thumbnail</label>
                        </div>
                    </div>
                </div>

                <ButtonGroup>
                    <Button color="secondary">Cancel</Button>
                    <Button>apply</Button>
                </ButtonGroup>
            </div>
        </Drawer>
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
}

.section {
    padding-bottom: 40px;

    &__title {
        font-size: rem(18px);
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
