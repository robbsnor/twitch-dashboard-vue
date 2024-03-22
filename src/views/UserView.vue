<script setup lang="ts">
import UserHeader from '/src/app/user/components/UserHeader.vue';
import TempTabs from '/src/app/user/components/TempTabs.vue';
import VueFeather from 'vue-feather';

const openDrawer = () => {
    console.log('open drawer');
}


</script>

<template>
    <div class="user">
        <UserHeader class="user__header" />

        <div class="user__container">
            <TempTabs />
            <VueFeather @click="openDrawer" type="arrow-down-right" />
        </div>

<!--
        <Drawer>
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                <Button variant="outline">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
            </DrawerContent>
        </Drawer> -->
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
