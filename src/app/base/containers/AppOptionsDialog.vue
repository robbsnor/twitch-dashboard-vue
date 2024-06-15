<script setup lang="ts">
import { defineModel } from 'vue';
import { useAppOptionsStore } from '../stores/AppOptions.store';

const appOptionsStore = useAppOptionsStore();
const dialog = defineModel<boolean>('dialog');
</script>

<template>
    <Dialog
        v-model:dialog="dialog"
        title="App settings"
        description="Customize the behaviour of the App."
        :width="400"
    >
        <div class="body">
            <div class="body__section">
                <h4>General:</h4>
                <v-text-field
                    v-model="appOptionsStore.options.app.vodDownloadURL"
                    label="VOD downloader URL:"
                    variant="solo"
                />
            </div>

            <div class="body__section">
                <h4>User profile:</h4>
                <v-switch
                    v-model="appOptionsStore.options.user.showThumbnail"
                    label="Show thumbnails"
                    @click="appOptionsStore.toggleUserShowThumbnail"
                />
                <v-switch
                    v-model="appOptionsStore.options.user.showDuration"
                    label="Show duration"
                    @click="appOptionsStore.toggleUserShowDuration"
                />
            </div>
        </div>

        <!-- <template #footer>
            <div class="footer">
                <Button color="secondary">Cancel</Button>
                <Button>Save</Button>
            </div>
        </template> -->
    </Dialog>
</template>

<style scoped lang="scss">
.body {

    &__section {
        margin-bottom: 20px;
    }
}

.footer {
    display: flex;
    justify-content: flex-end;
    gap: rem($padding);
}
</style>
