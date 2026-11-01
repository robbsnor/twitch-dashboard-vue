import { useAuthStore } from '../../auth/stores/auth.store';
import type { TwitchGetUsers, TwitchUser } from '../models/twitch/users.model';
import type { TwitchGetVideos, TwitchVideo } from '../models/twitch/videos.model';
import type { TwitchGetFollowedChannels } from '../models/twitch/followed-channels.model';
import type { TwitchCheckUserSubscription } from '../models/twitch/check-user-subscription.model';
import type { TwitchGetChannelFollowers } from '../models/twitch/channel-followers.model';
import type { VideoTypesModel } from '../models/twitch/video-types.model';
import type { TwitchGetStreams, TwitchStream } from '../models/twitch/get-streams';
import type { TwitchGame, TwitchGetGames } from '../models/twitch/games.model';
import type { TwitchFollowedStream, TwitchGetFollowedStreams } from '../models/twitch/followed-streams.model';
import type { TwitchFollowedStreamWithUser } from '../models/twitch/followed-streams-with-user.model';
import type { TwitchStreamsWithUser } from '../models/twitch/streams-with-user.model';
import type { TwitchGetSchedule, TwitchSchedule } from '../models/twitch/schedule.model';
import type { TwitchScheduleWithUser } from '../models/twitch/schedule-with-user.model';
import { supabase } from '@/app/supabase';
import { useRouter } from 'vue-router';
import type { TwitchPagination } from '../models/twitch/pagination.model';
import type {
    CheckUserSubscriptionParams,
    FetchOptions,
    GetFollowedChannelsParams,
    GetGamesParams,
    GetStreamsParams,
    GetUsersParams,
    GetVideosParams,
    QueryParams,
    RequestOptions,
    TwitchResponse,
} from '../models/twitch/twitch.model';
import { indexOf } from 'lodash';

export class TwitchApiError extends Error {
    constructor(public readonly status: number, public readonly body: unknown, message?: string) {
        super(message ?? `Twitch API error (${status})`);
        this.name = 'TwitchApiError';
    }
}

export function useTwitchApi() {
    const authStore = useAuthStore();

    function orderByParams<T>(items: T[], params: Array<{ values?: string[]; getValue: (item: T) => string }>): T[] {
        if (!params.some(({ values }) => values?.length)) return items;

        return items
            .map((item, responseIndex) => {
                for (let paramPriority = 0; paramPriority < params.length; paramPriority++) {
                    const param = params[paramPriority];
                    if (!param.values?.length) continue;

                    const paramIndex = indexOf(param.values, param.getValue(item));
                    if (paramIndex !== -1) {
                        return { item, responseIndex, paramPriority, paramIndex };
                    }
                }

                return { item, responseIndex, paramPriority: Number.MAX_SAFE_INTEGER, paramIndex: -1 };
            })
            .sort((a, b) => {
                return (
                    a.paramPriority - b.paramPriority ||
                    a.paramIndex - b.paramIndex ||
                    a.responseIndex - b.responseIndex
                );
            })
            .map(({ item }) => item);
    }

    async function getGames(params: GetGamesParams, options?: FetchOptions): Promise<TwitchGame[]> {
        const games = await request<TwitchGame>(
            '/games',
            {
                id: params.ids,
                name: params.names,
                igdb_id: params.igdbIds,
            },
            options
        );

        return orderByParams(games, [
            { values: params.ids, getValue: (game) => game.id },
            { values: params.names, getValue: (game) => game.name },
            { values: params.igdbIds, getValue: (game) => game.igdb_id },
        ]);
    }

    async function getUsers(params: GetUsersParams, options?: FetchOptions): Promise<TwitchUser[]> {
        const users = await request<TwitchUser>(
            '/users',
            {
                id: params.ids,
                login: params.logins,
            },
            options
        );

        return orderByParams(users, [
            { values: params.ids, getValue: (user) => user.id },
            { values: params.logins, getValue: (user) => user.login },
        ]);
    }

    async function getFollowedStreams(options?: FetchOptions): Promise<TwitchFollowedStream[]> {
        return request<TwitchFollowedStream>(
            '/streams/followed',
            {
                user_id: authStore.twitchUser?.provider_id,
            },
            options
        );
    }

    async function getFollowedChannels(
        params: GetFollowedChannelsParams,
        options?: FetchOptions
    ): Promise<TwitchGame[]> {
        const channels = await request<TwitchGame>(
            '/channels/followed',
            {
                id: params.ids,
            },
            options
        );

        return orderByParams(channels, [{ values: params.ids, getValue: (channel) => channel.id }]);
    }

    async function getVideos(params: GetVideosParams, options?: FetchOptions): Promise<TwitchVideo[]> {
        const videos = await request<TwitchVideo>(
            '/videos',
            {
                id: params.videoIds,
                user_id: params.userIds,
                game_id: params.gameIds,
            },
            options
        );

        console.log(videos);

        return orderByParams(videos, [
            { values: params.videoIds, getValue: (video) => video.id },
            { values: params.userIds, getValue: (video) => video.user_id },
        ]);
    }

    async function getStreams(params: GetStreamsParams, options?: FetchOptions): Promise<TwitchStream[]> {
        const streams = await request<TwitchStream>(
            '/streams',
            {
                user_id: params.userIds,
                user_login: params.userLogins,
                game_id: params.gameIds,
            },
            options
        );

        return orderByParams(streams, [
            { values: params.userIds, getValue: (stream) => stream.user_id },
            { values: params.userLogins, getValue: (stream) => stream.user_login },
            { values: params.gameIds, getValue: (stream) => stream.game_id },
        ]);
    }

    async function checkUserSubscription(
        params: CheckUserSubscriptionParams,
        options?: FetchOptions
    ): Promise<boolean> {
        const user = await request<TwitchUser>(
            '/subscriptions/user',
            {
                broadcaster_id: params.broadcasterId,
                user_id: params.userId,
            },
            options
        );

        console.log('user: ', user);

        return !!user;
    }

    async function getStreamsWithUser(
        params: GetStreamsParams,
        options?: FetchOptions
    ): Promise<TwitchStreamsWithUser[]> {
        const streams = await getStreams(params, options);
        const userIds = streams.map((stream) => stream.user_id);
        const users = await getUsers({ ids: userIds }, options);

        return (
            streams
                .map((stream) => {
                    const user = users.find((user) => user.id === stream.user_id);
                    if (!user) return;

                    return {
                        ...stream,
                        ...user!,
                    };
                })
                .filter((stream) => !!stream)
                // @ts-ignore
                .sort((a, b) => b.viewer_count - a.viewer_count) as TwitchStreamsWithUser[]
        );
    }

    async function request<T>(path: string, query: QueryParams = {}, options: RequestOptions = {}): Promise<T[]> {
        if (!authStore.session) {
            throw new Error('Not logged in');
        }

        if (!authStore.twitchAccessToken || !authStore.twitchRefreshToken) {
            throw new Error('Missing Twitch tokens');
        }

        const { method = 'GET', maxItems = 100, pageSize = 100 } = options;

        const all: T[] = [];
        let queryBatches: QueryParams[] = [{}];

        for (const [key, value] of Object.entries(query)) {
            const values =
                Array.isArray(value) && value.length > 100
                    ? Array.from({ length: Math.ceil(value.length / 100) }, (_, index) =>
                          value.slice(index * 100, (index + 1) * 100)
                      )
                    : [value];

            queryBatches = queryBatches.flatMap((batch) => values.map((value) => ({ ...batch, [key]: value })));
        }

        for (const batch of queryBatches) {
            let after: string | undefined;

            do {
                const first = Math.max(1, Math.min(pageSize, 100, maxItems - all.length));

                const url = new URL(`https://api.twitch.tv/helix${path}`);

                for (const [key, value] of Object.entries({ first, ...batch, after })) {
                    if (Array.isArray(value)) {
                        value.forEach((item) => url.searchParams.append(key, String(item)));
                    } else if (value !== undefined) {
                        url.searchParams.set(key, String(value));
                    }
                }

                const _req = () => {
                    return fetch(url, {
                        method,
                        headers: {
                            Authorization: `Bearer ${authStore.twitchAccessToken}`,
                            'Client-Id': import.meta.env.VITE_TWITCH_CLIENT_ID,
                        },
                    });
                };

                let res = await _req();

                if (res.status === 401) {
                    await refreshTokens();
                    res = await _req();
                }

                if (!res.ok) {
                    const body = await res.json().catch(() => null);
                    throw body;
                }

                const page = (await res.json()) as TwitchResponse<T>;
                all.push(...page.data);
                after = page.pagination?.cursor;
            } while (after && all.length < maxItems);

            if (all.length >= maxItems) break;
        }

        return all.slice(0, maxItems);
    }

    // api calls
    async function refreshTokens() {
        if (!authStore.session || !authStore.twitchAccessToken || !authStore.twitchRefreshToken) {
            console.log('No session or tokens available for refresh');
            return;
        }

        try {
            const { data, error } = await supabase.functions.invoke('refresh-twitch-token', {
                body: {
                    refresh_token: authStore.twitchRefreshToken,
                },
            });
            if (error) throw error;

            const { access_token, refresh_token } = data;

            authStore.twitchAccessToken = access_token;
            authStore.twitchRefreshToken = refresh_token;
        } catch (err) {
            throw err;
        }
    }

    return {
        getUsers,
        getFollowedStreams,
        getFollowedChannels,
        getGames,
        getVideos,
        getStreams,
        getStreamsWithUser,
        checkUserSubscription,
    };
}
