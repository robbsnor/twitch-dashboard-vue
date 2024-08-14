<template>
    <Section>
        <div class="four">
            <h1 class="four__title">404 - Page not found</h1>
            <RouterLink class="four__link" :to="{ name: 'home' }"
                >Go back home</RouterLink
            >
        </div>
    </Section>
</template>

<style lang="scss" scoped>
.four {
    &__link {
        color: $c-primary;
        text-decoration: underline;
    }
}
</style>
