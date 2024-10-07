// https://dev.twitch.tv/docs/api/reference/#get-channel-stream-schedule

export interface TwitchStreamSchedule {
    segments?: TwitchSegment[];
    broadcaster_id: string;
    broadcaster_name: string;
    broadcaster_login: string;
    vacation: any;
}

export interface TwitchSegment {
    id: string;
    start_time: string;
    end_time: string;
    title: string;
    canceled_until: any;
    category?: TwitchCategory;
    is_recurring: boolean;
}

export interface TwitchCategory {
    id: string;
    name: string;
}
