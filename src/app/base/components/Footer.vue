<script setup lang="ts">
const links = [
    {
        href: 'https://github.com/robbsnor/twitch-dashboard-vue',
        icon: 'github',
        tooltip: 'Github Repo',
    },
    {
        href: 'https://vercel.com/robbsnors-projects/twitch-dashboard-vue/deployments',
        icon: 'activity',
        tooltip: 'Vercel',
    },
];
</script>

<template>
    <footer class="flex justify-center items-center gap-12 py-12 px-4">
        <v-tooltip v-for="link in links" :text="link.tooltip" :key="link.icon">
            <template v-slot:activator="{ props }">
                <a v-bind="props" :href="link.href" target="_blank">
                    <vue-feather :type="link.icon" class="transition-all text-muted-more hover:text-primary" />
                </a>
            </template>
        </v-tooltip>
    </footer>
</template>
