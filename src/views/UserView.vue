<script setup lang="ts">
import UserHeader from '../app/user/components/UserHeader.vue';
import TempTabs from '../app/user/components/TempTabs.vue';
import DrawerFilter from '../app/user/components/DrawerFilter.vue';
import VueFeather from 'vue-feather';
import { ref } from 'vue';

const _showDrawer = ref(false);

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
            <DrawerFilter @toggle-drawer="toggleDrawer" />
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

// @include screen(1400px) {
//     &__body {
//         grid-template-columns: repeat(5, 1fr);
//     }
// }
</style>
