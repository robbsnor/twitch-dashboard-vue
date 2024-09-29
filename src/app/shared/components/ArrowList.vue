<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
    items: { text: string; url: string }[];
}>(), {});

const cssClass = computed(() => {
    return {
        'arrow-list': true,
    };
});

const indicator = ref<HTMLElement | null>(null);

const onItemClick = (event: PointerEvent) => {
    emits('click:item');
    const el = event.target as HTMLElement;
    // move indicator to position of element...

}

const emits = defineEmits(['click:item']);
</script>

<template>
    <div :class="cssClass">
        <ul class="arrow-list__ul">
            <li
                v-for="item in props.items"
                :key="item.text"
                class="arrow-list__li"
            >
                <RouterLink
                    @click="onItemClick($event)"
                    :to="item.url"
                    class="arrow-list__link"
                >
                    {{ item.text }}
                </RouterLink>
            </li>
        </ul>

        <div class="arrow-list__indicator" ref="indicator"></div>
    </div>
</template>

<style scoped lang="scss">
.arrow-list {
    position: relative;

    &__ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        padding-left: 30px;
    }

    &__link {
        // color: $c-primary;
        padding: rem(10px) 0;
        display: block;
    }

    &__indicator {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid $c-primary;
    }
}
</style>
