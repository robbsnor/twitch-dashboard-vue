import { useAuthStore } from '../../auth/stores/auth.store';
import type { TwitchGetUsers, TwitchUser } from '../models/twitch/users.model';
import type { TwitchGetVideos, TwitchVideo } from '../models/twitch/videos.model';
import type { TwitchGetFollowedChannels } from '../models/twitch/followed-channels.model';
import type { TwitchCheckUserSubscription } from '../models/twitch/check-user-subscription.model';
import type { TwitchGetChannelFollowers } from '../models/twitch/channel-followers.model';
import type { VideoTypesModel } from '../models/twitch/video-types.model';
import type { TwitchGetStreams } from '../models/twitch/get-streams';
import type { TwitchGame, TwitchGetGames } from '../models/twitch/games.model';
import type { TwitchFollowedStream, TwitchGetFollowedStreams } from '../models/twitch/followed-streams.model';
import type { TwitchFollowedStreamWithUser } from '../models/twitch/followed-streams-with-user.model';
import type { TwitchStreamsWithUser } from '../models/twitch/streams-with-user.model';
import type { TwitchGetSchedule, TwitchSchedule } from '../models/twitch/schedule.model';
import type { TwitchScheduleWithUser } from '../models/twitch/schedule-with-user.model';
import { supabase } from '@/app/supabase';

export function TwitchApiService2() {
    const authStore = useAuthStore();

    async function http<T>(url: string): Promise<T> {
        if (!authStore.session?.provider_token) {
            await refreshTokens();
        }

        const res = await fetch(url, {
            headers: {
                authorization: `Bearer ${authStore.session?.provider_token}`,
                'Client-Id': `bpjttmchlxdfo9t47z8g3b7snhr9h4`,
            },
        });

        const data: T = await res.json();

        return data;
    }

    // api calls
    async function refreshTokens() {
        const { data, error } = await supabase.functions.invoke('refresh-twitch-token', {
            body: {
                refresh_token: authStore.refreshToken,
            },
        });

        console.log('Refreshing Twitch token...');

        // if (error) {
        //     await this.authStore.signOut();
        //     throw new Error(`Failed to refresh Twitch access token: ${error.message}`);
        // }

        authStore.accessToken = data.access_token;
        authStore.refreshToken = data.refresh_token;
    }

    async function getUsers(user: { ids?: number[]; logins?: string[] }): Promise<TwitchGetUsers> {
        const url = new URL('https://api.twitch.tv/helix/users');
        if (user.ids) user.ids.forEach((id) => url.searchParams.append('id', id.toString()));
        if (user.logins) user.logins.forEach((login) => url.searchParams.append('login', login));

        const res = await http<TwitchGetUsers>(url.toString());
        if (res.data.length === 0) throw new Error('No users found');

        const unorderedUsers = res.data;
        let orderedUsers: TwitchUser[] = [];

        // it will find one
        if (user.ids) {
            // @ts-ignore
            orderedUsers = user.ids.map((userId) => {
                return unorderedUsers.find((unorderedUser) => Number(unorderedUser.id) === userId);
            });
        }

        if (user.logins) {
            // @ts-ignore
            orderedUsers = user.logins.map((user) => {
                return unorderedUsers.find((unorderedUser) => unorderedUser.login === user.toLocaleLowerCase());
            });
        }

        res.data = orderedUsers;
        return res;
    }

    return {
        getUsers,
    };
}

export class TwitchApiService {
    private static authStore = useAuthStore();

    public static async http<T>(url: string): Promise<T> {
        if (!this.authStore.session?.provider_token) {
            await this.refreshTokens();
        }

        const res = await fetch(url, {
            headers: {
                authorization: `Bearer ${this.authStore.session?.provider_token}`,
                'Client-Id': `bpjttmchlxdfo9t47z8g3b7snhr9h4`,
            },
        });

        const data: T = await res.json();

        return data;
    }

    // api calls
    private static async refreshTokens() {
        const { data, error } = await supabase.functions.invoke('refresh-twitch-token', {
            body: {
                refresh_token: this.authStore.refreshToken,
            },
        });

        console.log('Refreshing Twitch token...');

        // if (error) {
        //     await this.authStore.signOut();
        //     throw new Error(`Failed to refresh Twitch access token: ${error.message}`);
        // }

        this.authStore.accessToken = data.access_token;
        this.authStore.refreshToken = data.refresh_token;
    }

    public static async getUsers(user: { ids?: number[]; logins?: string[] }): Promise<TwitchGetUsers> {
        const url = new URL('https://api.twitch.tv/helix/users');
        if (user.ids) user.ids.forEach((id) => url.searchParams.append('id', id.toString()));
        if (user.logins) user.logins.forEach((login) => url.searchParams.append('login', login));

        const res = await this.http<TwitchGetUsers>(url.toString());
        if (res.data.length === 0) throw new Error('No users found');

        const unorderedUsers = res.data;
        let orderedUsers: TwitchUser[] = [];

        // it will find one
        if (user.ids) {
            // @ts-ignore
            orderedUsers = user.ids.map((userId) => {
                return unorderedUsers.find((unorderedUser) => Number(unorderedUser.id) === userId);
            });
        }

        if (user.logins) {
            // @ts-ignore
            orderedUsers = user.logins.map((user) => {
                return unorderedUsers.find((unorderedUser) => unorderedUser.login === user.toLocaleLowerCase());
            });
        }

        res.data = orderedUsers;
        return res;
    }

    public static async getFollowedStreams(): Promise<TwitchFollowedStream[]> {
        const url = new URL('https://api.twitch.tv/helix/streams/followed');
        const userId = this.authStore.user!.provider_id;
        url.searchParams.append('user_id', userId);
        const res = await this.http<TwitchGetFollowedStreams>(url.toString());
        return res.data;
    }

    public static async getFollowedStreamsWithUser(): Promise<TwitchFollowedStreamWithUser[]> {
        const followedStreams = await this.getFollowedStreams();
        const userIds = followedStreams.map((stream) => Number(stream.user_id));
        const users = (await this.getUsers({ ids: userIds })).data;
        const streamsWithUser = followedStreams.map<TwitchFollowedStreamWithUser>((stream, index) => {
            return {
                ...followedStreams[index],
                ...users[index],
            };
        });
        return streamsWithUser;
    }

    public static async getFollowedChannels(
        userId: number,
        broadcasterId?: number
    ): Promise<TwitchGetFollowedChannels> {
        const url = new URL('https://api.twitch.tv/helix/channels/followed');
        url.searchParams.append('user_id', userId.toString());
        if (broadcasterId) url.searchParams.append('broadcaster_id', broadcasterId.toString());

        const res = await this.http<TwitchGetFollowedChannels>(url.toString());
        return res;
    }

    public static async getVideosByUserId(
        userId: number,
        type: VideoTypesModel = 'all',
        after?: string, // cursor
        amount: number = 20
        // options?: TwitchGetVideosOptions,
    ): Promise<TwitchGetVideos> {
        const url = new URL('https://api.twitch.tv/helix/videos');
        url.searchParams.append('user_id', userId.toString());
        url.searchParams.append('type', type);
        url.searchParams.append('first', amount.toString());
        if (after) url.searchParams.append('after', after);

        const res = await this.http<TwitchGetVideos>(url.toString());
        return res;
    }

    public static async getVideosByVideoIds(ids: number[]): Promise<TwitchGetVideos | { data: never[] }> {
        const url = new URL('https://api.twitch.tv/helix/videos');
        if (ids.length > 100) ids = ids.slice(0, 100);
        if (ids.length === 0) return { data: [] };

        ids.forEach((id) => url.searchParams.append('id', id.toString()));
        const res = await this.http<TwitchGetVideos>(url.toString());
        const unorderedVideos = res.data;

        const orderedVideos: TwitchVideo[] = ids.reduce((acc: TwitchVideo[], id: number) => {
            const video = unorderedVideos.find((unorderedVideo) => Number(unorderedVideo.id) === id);
            if (video) acc.push(video);
            return acc;
        }, []);

        res.data = orderedVideos;
        return res;
    }

    public static async getChannelFollowers(broadcasterId: number): Promise<TwitchGetChannelFollowers> {
        const url = new URL('https://api.twitch.tv/helix/channels/followers');
        url.searchParams.append('broadcaster_id', broadcasterId.toString());

        const res = await this.http<TwitchGetChannelFollowers>(url.toString());
        return res;
    }

    public static async getGames(game: { ids?: number[]; names?: string[] }): Promise<TwitchGetGames> {
        const url = new URL('https://api.twitch.tv/helix/games');
        if (game.ids) game.ids.forEach((id) => url.searchParams.append('id', id.toString()));
        if (game.names) game.names.forEach((name) => url.searchParams.append('name', name));

        const res = await this.http<TwitchGetGames>(url.toString());

        let orderedGames: TwitchGame[] = [];

        // the ordering of the games could look prettier
        if (game.ids) {
            orderedGames = game.ids
                .map((gameId) => res.data.find((game) => Number(game.id) === gameId))
                .filter(Boolean) as TwitchGame[];
        }

        if (game.names) {
            orderedGames = game.names
                .map((gameName) => res.data.find((game) => game.name.toLowerCase() === gameName.toLowerCase()))
                .filter(Boolean) as TwitchGame[];
        }

        res.data = orderedGames;
        return res;
    }

    public static async getStreamsByGameIds(ids: number[]): Promise<TwitchGetStreams> {
        const url = new URL('https://api.twitch.tv/helix/streams');
        ids.forEach((id) => url.searchParams.append('game_id', id.toString()));
        url.searchParams.append('first', '100');

        const res = await this.http<TwitchGetStreams>(url.toString());
        return res;
    }

    public static async getStreamsByGameIdWithUsers(id: number): Promise<TwitchStreamsWithUser[]> {
        const streams = (await this.getStreamsByGameIds([id])).data;
        const userIds = streams.map((stream) => Number(stream.user_id));
        const users = (await this.getUsers({ ids: userIds })).data;
        const streamsWithUser = streams.map<TwitchStreamsWithUser>((stream, index) => {
            return {
                ...streams[index],
                ...users[index],
            };
        });
        return streamsWithUser;
    }

    public static async getSchedules(userIds: number[], amount = 25): Promise<TwitchSchedule[]> {
        const promises = userIds.map(async (userId) => {
            const url = new URL('https://api.twitch.tv/helix/schedule');
            url.searchParams.append('broadcaster_id', userId.toString());
            url.searchParams.append('first', amount.toString());
            return await this.http<TwitchGetSchedule>(url.toString()).catch(() => null);
        });

        return (await Promise.all(promises)).filter(Boolean).map((res) => res!.data);
    }

    public static async getScheduleWithUsers(userIds: number[]): Promise<TwitchScheduleWithUser[]> {
        const schedules = await this.getSchedules(userIds);
        const userIdsWithSchedules = schedules.map((schedule) => Number(schedule.broadcaster_id));
        const usersWithSchedules = (await this.getUsers({ ids: userIdsWithSchedules })).data;

        return usersWithSchedules.map((user) => {
            const schedule = schedules.find((schedule) => Number(schedule.broadcaster_id) === Number(user.id))!;

            return { schedule, user };
        });
    }

    public static async checkUserSubscription(userId: number, broadcasterId: number): Promise<boolean> {
        const url = new URL('https://api.twitch.tv/helix/subscriptions/user');
        url.searchParams.append('user_id', userId.toString());
        url.searchParams.append('broadcaster_id', broadcasterId.toString());

        return this.http<TwitchCheckUserSubscription>(url.toString())
            .then(() => true)
            .catch(() => false);
    }
}
