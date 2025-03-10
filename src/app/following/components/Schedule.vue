<script setup lang="ts">
// @ts-nocheck
import { group } from 'console';
import { computed, onMounted, ref } from 'vue';
import { TwitchSchedule } from '../../shared/models/twitch/schedule.model';
import { TwitchUser } from '../../shared/models/twitch/users.model';

const props = defineProps<{
    schedules: TwitchSchedule[];
    users: TwitchUser[];
}>();

const timeRange = computed(() => {
    const schedules = props.schedules.flatMap(schedule => schedule.segments);
    const startTimes = schedules.map(schedule => new Date(schedule.start_time).getHours());
    const endTimes = schedules.map(schedule => new Date(schedule.end_time).getHours());

    const lowestStartTime = Math.min(...startTimes);
    const highestEndTime = Math.max(...endTimes);
    const numbers = Array.from({ length: highestEndTime - lowestStartTime + 1 }, (_, i) => `${ i + lowestStartTime }:00`); // real

    return numbers;
});

const mappedSchedules = computed(() => {
    const today = new Date();
    const sevenDaysFromNow = new Date(today.setDate(today.getDate() + 6));

    const schedules = props.schedules
        .flatMap(schedule =>
            schedule.segments.map(segment => {
                const user = props.users.find(user => user.id === schedule.broadcaster_id);
                return { user, ...segment };
            })
        )
        .filter(schedule => {
            const scheduleDate = new Date(schedule.start_time);
            return scheduleDate < sevenDaysFromNow;
        })
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

    const mapped = schedules.reduce((acc, schedule) => {
        const date = new Date(schedule.start_time).toISOString().split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(schedule);
        return acc;
    }, {});

    const groupedByDate = Object.keys(mapped).map(date => ({
        date,
        streams: mapped[date]
    }));

    return groupedByDate;
});

const getTitle = (date: String) => {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];

    if (date === new Date().toISOString().split('T')[0]) {
        return 'Today';
    } else if (date === tomorrow) {
        return 'Tomorrow';
    } else {
        return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    }
}

</script>

<template>
    <Section title="Upcomming streams">
        <div class="wrapper">
            <div class="schedule">
                <div v-for="schedule in mappedSchedules" :key="schedule.date" class="day">
                    <div class="day">{{ getTitle(schedule.date) }}</div>

                    <div class="streams">
                        <div v-for="stream in schedule.streams" :key="stream.user.id" class="stream">
                            <v-tooltip :text="stream.user.display_name">
                                <template v-slot:activator="{ props }">
                                    <img :to="{ name: 'user', params: { userLogin: stream.user.display_name } }" v-bind="props" :src="stream.user.profile_image_url" class="avatar" alt="">
                                </template>
                            </v-tooltip>

                            <div>
                                <h4 class="title">{{ stream.title ? stream.title : '-' }}</h4>
                                <h6 class="game">{{ stream.category ? stream.category.name : '-' }}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Section>
</template>

<style scoped lang="scss">
.wrapper {
    overflow-x: auto;
}

.schedule {
    display: flex;
    gap: rem($padding-larger);
    flex-wrap: nowrap;
}

.day {
    min-width: 500px;
    flex-shrink: 0;
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 4px;
}

.streams {
    display: flex;
    gap: 8px;
    flex-direction: column;
    background-color: $c-black-3;
    border: 1px solid $c-black-5;
    border-radius: rem($border-radius-large);
    max-height: 380px;
    overflow: auto;
}

.stream {
    display: flex;
    gap: 16px;
    padding: 8px 16px;
    border-bottom: 1px solid $c-black-5;

    &:last-child {
        border-bottom: none;
    }
}

.title {
    padding-bottom: 4px;
}

.game {
    color: $c-black-16;
}

.user {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $c-black-10;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    flex-shrink: 0;
}
</style>
