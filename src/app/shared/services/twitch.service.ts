import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../../auth/stores/auth.store";
import type { TwitchFollowedStreamWithUser, TwitchGetFollowedStreams } from "../models/twitch/followed-streams.model";
import type { TwitchGetUsers, TwitchUser } from "../models/twitch/users.model";
import type { TwitchGetVideos, TwitchVideo } from './../models/twitch/videos.model';
import type { TwitchGetFollowedChannels } from "../models/twitch/followed-channels.model";
import type { TwitchCheckUserSubscription } from "../models/twitch/check-user-subscription.model";
import type { TwitchGetChannelFollowers } from "../models/twitch/channel-followers.model";

export interface User {
    ids?: number[];
    logins?: string[];
}

export class TwitchService {
    private http = axios.create();
    private accessToken: string;
    private authStore = useAuthStore();

    constructor(accessToken?: string) {
        this.accessToken = accessToken ?? this.authStore.accessToken!;

        this.http.interceptors.request.use((config) => {
            this.authInterceptorFunction(config);
            this.clientIdInterceptorFunction(config);
            return config;
        });
    }

    // api calls
    public async getUsers(user: User) {
        const url = new URL('https://api.twitch.tv/helix/users');
        if (user.ids) user.ids.forEach(id => url.searchParams.append('id', id.toString()));
        if (user.logins) user.logins.forEach(login => url.searchParams.append('login', login.toString()));

        const res = await this.http.get<TwitchGetUsers>(url.toString());
        if (res.data.data.length === 0) throw new Error('No users found');

        const unorderedUsers = res.data.data;

        let orderedUsers: TwitchUser[] = [];

        // it will find one
        if (user.ids) {
            // @ts-ignore
            orderedUsers = user.ids.map((userId) => {
                return unorderedUsers.find(unorderedUser => Number(unorderedUser.id) === userId);
            });
        }

        if (user.logins) {
            // @ts-ignore
            orderedUsers = user.logins.map((user) => {
                return unorderedUsers.find(unorderedUser => unorderedUser.login === user.toLocaleLowerCase());
            });
        }

        return orderedUsers;
    }

    public async getFollowedStreams() {
        const url = new URL('https://api.twitch.tv/helix/streams/followed');
        const userId = this.authStore.user!.id;
        url.searchParams.append('user_id', userId);
        const res = await this.http.get<TwitchGetFollowedStreams>(url.toString());
        return res.data.data;
    }

    public async getVideosByUserId(
        userId: number,
        after?: string, // cursor
        amount: number = 20,
        // options?: TwitchGetVideosOptions,
    ) {
        const url = new URL('https://api.twitch.tv/helix/videos');
        url.searchParams.append('user_id', userId.toString());
        url.searchParams.append('first', amount.toString()); // temp
        if (after) url.searchParams.append('after', after);

        const res = await this.http.get<TwitchGetVideos>(url.toString());
        return res.data;
    }

    public async getVideosByVideoIds(
        ids: number[],
    ) {
        const url = new URL('https://api.twitch.tv/helix/videos');

        if (ids.length > 100) ids = ids.slice(0, 100);
        if (ids.length === 0) return { data: [] };
        ids.forEach(id => url.searchParams.append('id', id.toString()));
        const res = await this.http.get<TwitchGetVideos>(url.toString());
        const unorderedVideos = res.data.data;

        // it will find one
        // @ts-ignore
        const orderedVideos: TwitchVideo[] = ids.map((id) => {
            return unorderedVideos.find(unorderedUser => Number(unorderedUser.id) === id);
        });
        res.data.data = orderedVideos;

        return res.data;
    }


    public async getFollowedStreamsWithUsers() {
        const followedStreams = await this.getFollowedStreams();
        const userIds = followedStreams.map(stream => Number(stream.user_id));

        const users = await this.getUsers({ ids: userIds });

        const streamsWithUser = followedStreams.map<TwitchFollowedStreamWithUser>((stream, index) => {
            return {
                ...followedStreams[index],
                ...users[index]
            };
        });

        return streamsWithUser;
    }

    public async getFollowedChannels(userId: number, broadcasterId?: number) {
        const url = new URL('https://api.twitch.tv/helix/channels/followed');
        url.searchParams.append('user_id', userId.toString());
        if (broadcasterId) url.searchParams.append('broadcaster_id', broadcasterId.toString());

        const res = await this.http.get<TwitchGetFollowedChannels>(url.toString());
        return res.data;
    }

    public async getChannelFollowers(broadcasterId: number) {
        const url = new URL('https://api.twitch.tv/helix/channels/followers');
        url.searchParams.append('broadcaster_id', broadcasterId.toString());

        const res = await this.http.get<TwitchGetChannelFollowers>(url.toString());
        return res.data;
    }

    public async checkUserSubscription(userId: number, broadcasterId: number) {
        const url = new URL('https://api.twitch.tv/helix/subscriptions/user');
        url.searchParams.append('user_id', userId.toString());
        url.searchParams.append('broadcaster_id', broadcasterId.toString());

        const res = await this.http.get<TwitchCheckUserSubscription>(url.toString())
            .then(() => true)
            .catch(() => false);

        return res;
    }

    // interceptors
    private authInterceptorFunction(config: InternalAxiosRequestConfig<any>) {
        config.headers.set('Authorization', `Bearer ${this.accessToken}`);
        return config;
    };

    private clientIdInterceptorFunction(config: InternalAxiosRequestConfig<any>) {
        config.headers.set('Client-Id', `bpjttmchlxdfo9t47z8g3b7snhr9h4`);
        return config;
    }

    // static methods
    public static async validateToken(accessToken: string) {
        const res = await axios.get('https://id.twitch.tv/oauth2/validate', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return {
            userId: res.data.user_id,
            userLogin: res.data.login,
        };
    }
}
