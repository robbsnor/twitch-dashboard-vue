<script setup lang="ts">
import AppOptionsDialog from '@/app/base/containers/AppOptionsDialog.vue';
import { ref } from 'vue';

const settingsDialog = ref(false);
</script>

<template>
  <footer class="footer">

        <v-tooltip text="Github Repo">
            <template v-slot:activator="{ props }">
                <a v-bind="props" class="footer__icon-link" href="https://github.com/robbsnor/twitch-dashboard-vue" target="_blank">
                    <vue-feather class="footer__icon" type="github"></vue-feather>
                </a>
            </template>
        </v-tooltip>

        <v-tooltip text="Vercel">
            <template v-slot:activator="{ props }">
                <a v-bind="props" class="footer__icon-link" href="https://vercel.com/robbsnor/twitch-dashboard-vue" target="_blank">
                    <vue-feather class="footer__icon" type="activity"></vue-feather>
                </a>
            </template>
        </v-tooltip>

        <v-tooltip text="App settings">
            <template v-slot:activator="{ props }">
                <div v-bind="props" class="footer__icon-link" @click="settingsDialog = !settingsDialog">
                    <vue-feather class="footer__icon" type="settings"></vue-feather>
                </div>
            </template>
        </v-tooltip>

        <AppOptionsDialog v-model:dialog="settingsDialog" />
    </footer>
</template>

<style scoped lang="scss">
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: rem(50px);
    padding: rem(50px) rem($padding);

    &__icon-link {
        transition: .2s;
        color: $c-black-8;
        cursor: pointer;

        &:hover {
            color: $c-primary;
        }
    }
}
</style>
