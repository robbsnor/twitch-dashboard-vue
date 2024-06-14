<template>
  <footer class="footer">
        <a class="footer__icon-link" href="https://github.com/robbsnor/twitch-dashboard-vue" target="_blank">
            <vue-feather class="footer__icon" type="github"></vue-feather>
        </a>
        <a class="footer__icon-link" href="https://vercel.com/robbsnor/twitch-dashboard-vue" target="_blank">
            <vue-feather class="footer__icon" type="activity"></vue-feather>
        </a>
    </footer>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/functions/rem';

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: rem(50px);
    padding: rem(50px) rem($padding);

    &__icon-link {
        transition: .2s;
        color: $c-black-8;

        &:hover {
            color: $c-primary;
        }
    }
}
</style>
