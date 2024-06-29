<script setup lang="ts">
</script>

<template>
  <footer class="footer">
        <v-tooltip text="Github Repo">
            <template v-slot:activator="{ props }">
                <a v-bind="props" class="footer__icon-link" href="https://github.com/robbsnor/twitch-dashboard-vue" target="_blank">
                    <vue-feather class="footer__icon" type="github" />
                </a>
            </template>
        </v-tooltip>

        <v-tooltip text="Vercel">
            <template v-slot:activator="{ props }">
                <a v-bind="props" class="footer__icon-link" href="https://vercel.com/robbsnors-projects/twitch-dashboard-vue/deployments" target="_blank">
                    <vue-feather class="footer__icon" type="activity" />
                </a>
            </template>
        </v-tooltip>
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
