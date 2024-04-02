<script setup lang="ts">
interface Props {
    title: string;
    pages: { name: string; path: string }[];
}

const props = defineProps<Props>();
</script>

<template>
    <div class="page-tabs">
        <h3 class="page-tabs__title">{{ props.title }}</h3>

        <ul class="page-tabs__list">
            <li v-for="page in props.pages" :key="page.name" class="page-tabs__list-item">
                <router-link
                    :to="page.path"
                    :class="{ 'page-tabs__link--active': $route.path === page.path }"
                    class="page-tabs__link"
                >
                    {{ page.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/var/color';
@import '/src/assets/styles/var/size';
@import '/src/assets/styles/functions/rem';

.page-tabs {
    &__title {
        font-size: rem(40px);
        padding-bottom: rem(5px);
    }

    &__list {
        display: flex;
        gap: rem(20px);
    }

    &__list-item {
        list-style: none;
    }

    &__link {
        color: $c-black-14;
        text-decoration: none;
        font-size: rem(22px);
        font-weight: bold;
        transition: .1s;

        &--active {
            color: $c-white;
        }

        &:not(.page-tabs__link--active):hover {
            color: $c-black-20;
        }
    }
}
</style>
