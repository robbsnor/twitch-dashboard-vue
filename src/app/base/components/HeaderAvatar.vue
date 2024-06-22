<script setup lang="ts">
import { ref } from 'vue';
import AppOptionsDialog from '@/app/base/containers/AppOptionsDialog.vue';

const props = defineProps<{
    image: string;
}>();

const settingsDialog = ref(false);

const toggleSettingsDialog = () => {
    settingsDialog.value = !settingsDialog.value;
};
</script>

<template>
    <v-menu location="bottom end">
        <template #activator="activator">
            <a v-bind="activator.props" class="header-avatar">
                <img :src="props.image" alt="" class="header-avatar__image">
            </a>
        </template>

        <v-list>
            <v-list-item disabled prepend-icon="mdi-account"><s>Account</s></v-list-item>
            <v-list-item prepend-icon="mdi-cog" @click="toggleSettingsDialog">Settings</v-list-item>
            <Divider />
            <v-list-item :to="{ name: 'sign-out' }" prepend-icon="mdi-logout">Logout</v-list-item>
        </v-list>
    </v-menu>

    <AppOptionsDialog v-model:dialog="settingsDialog" />
</template>

<style scoped lang="scss">
.header-avatar {
    position: relative;
    width: rem(30px);
    height: rem(30px);

    &:after {
        content: '';
        position: absolute;
        top: -4px;
        right: -4px;
        bottom: -4px;
        left: -4px;
        border: 2px solid $c-primary;
        border-radius: 999px;
    }

    &__image {
        border-radius: 999px;
    }
}
</style>
