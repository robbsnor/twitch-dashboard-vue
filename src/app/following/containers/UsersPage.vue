<script setup lang="ts">
import Section from '../../shared/components/Section.vue';
import { useLiveStore } from '../stores/live.store';

const liveStore = useLiveStore();
</script>

<template>
    <div class="users">
        <div class="users__tabs">
            <PageTabs :title="liveStore.pageTabs.title" :pages="liveStore.pageTabs.paths" />
        </div>

        <Section title="Users">

            Boe

        </Section>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/mixins/container';
@import '/src/assets/styles/functions/rem';

.users {
    &__tabs {
        @include container();
    }
}
</style>
