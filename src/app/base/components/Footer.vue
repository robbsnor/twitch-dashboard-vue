<template>
  <footer class="footer">
        <a class="footer_icon_link" href="https://github.com/robbsnor/twitch-dashboard-vue" target="_blank">
            <vue-feather class="github-icon" type="github"></vue-feather>
        </a>
        <a class="footer_icon_link" href="https://vercel.com/robbsnor/twitch-dashboard-vue" target="_blank">
            <vue-feather class="vercel" type="activity"></vue-feather>
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
    gap: 50px;
    padding: 50px rem($padding);
    background-color: $c-black-2;
}

.footer_icon_link {
    transition: .2s;
    color: $c-black-6;

    &:hover {
        color: $c-primary;
    }
}
</style>
