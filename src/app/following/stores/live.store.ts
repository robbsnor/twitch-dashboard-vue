import type { TwitchFollowedStreamWithUser } from './../../shared/models/twitch/followed-streams.model';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { TwitchService } from '../../shared/services/twitch.service';

export const useLiveStore = defineStore('live', () => {
    const _allStreams = ref<TwitchFollowedStreamWithUser[]>();
    const pageTabs = {
        title: 'Following',
        paths: [
            {
                name: 'Live',
                path: '/following/live',
            },
            {
                name: 'Users',
                path: '/following/users',
            },
        ],
    };

    const getAllStreams = async () => {
        return new TwitchService().getFollowedStreamsWithUsers();
        if (!_allStreams.value) _allStreams.value = await new TwitchService().getFollowedStreamsWithUsers();
        return _allStreams.value;
    };

    return {
        getAllStreams,
        pageTabs,
    };
});
