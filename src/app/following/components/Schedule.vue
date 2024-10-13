<script setup lang="ts">
import { computed } from 'vue';
import type { ScheduleModel } from '../services/live.service';

const props = withDefaults(defineProps<{
    schedule: ScheduleModel;
}>(), {
 });

const cssClass = computed(() => {
    return {
        schedule: true,
    };
});

const title = computed(() =>  props.schedule.title || '-');

const startDate = computed(() => {
    const options = { day: '2-digit', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(props.schedule.startTime).toLocaleString('nl-NL', options).toLowerCase();
});

const endDate = computed(() => {
    const options = { day: '2-digit', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(props.schedule.endTime).toLocaleString('nl-NL', options).toLowerCase();
});

const timeUntil = computed(() => {
    const now = new Date();
    const startTime = new Date(props.schedule.startTime);
    const diff = startTime.getTime() - now.getTime();
    const diffInMinutes = Math.floor(diff / 1000 / 60);
    return diffInMinutes;
});
</script>

<template>
    <div :class="cssClass">
        <RouterLink class="schedule__user" :to="{ name: 'user', params: { userLogin: props.schedule.name } }">
            <img class="schedule__avatar" :src="props.schedule.avatar" alt="">
            <h2 class="schedule__username">{{ props.schedule.name }}</h2>
        </RouterLink>

        <h2 class="schedule__title">{{ title }}</h2>

        <div class="schedule__date">
            <span class="schedule__start-time">{{ startDate }}</span> - <span class="schedule__end-time">{{ endDate }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.schedule {
    background-color: $c-black-3;
    border: 1px solid $c-black-5;
    padding: 30px;
    border-radius: rem($border-radius-large);

    &__user {
        display: flex;
        gap: 20px;
        align-items: center;
        padding-bottom: 20px;
    }

    &__username {
        padding: 0;
        font-size: 24px;
    }


    &__avatar {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        border-radius: 999px;
    }

    &__title {
        color: $c-white--dark;
        font-size: 20px;
    }

    &__date {
        color: $c-black-20;
    }
}
</style>
