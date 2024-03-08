import axios, { type InternalAxiosRequestConfig } from "axios";
import { AuthService } from "../../auth/services/auth.service";
import type { TwitchFollowedStreamWithUser, TwitchGetFollowedStreams } from "../models/twitch/followed-streams.model";
import type { TwitchGetUsers, TwitchUser } from "../models/twitch/users.model";

export class TwitchService {
    private http = axios.create();
    private accessToken = AuthService.getAccessToken();

    constructor() {
        this.http.interceptors.request.use((config) => {
            this.authInterceptorFunction(config);
            this.clientIdInterceptorFunction(config);
            return config;
        });
    }

    // api calls
    public async getUsers(userIds: number[]) {
        const url = new URL('https://api.twitch.tv/helix/users');
        userIds.forEach(id => {
            url.searchParams.append('id', id.toString());
        });
        const res = await this.http.get<TwitchGetUsers>(url.toString());
        const unorderedUsers = res.data.data;
        const orderedUsers = userIds.map((userId) => {
            // will allways return true
            return unorderedUsers.find(unorderedUser => Number(unorderedUser.id) === userId);
        });

        // @ts-ignore
        return orderedUsers as TwitchUser[];
    }

    public async getFollowedStreams() {
        const url = new URL('https://api.twitch.tv/helix/streams/followed');
        url.searchParams.append('user_id', '23611469');
        const res = await this.http.get<TwitchGetFollowedStreams>(url.toString());

        return res.data.data;
    }

    public async getVideos(userId: number) {
        const url = new URL('https://api.twitch.tv/helix/videos');
        url.searchParams.append('user_id', userId.toString());
        const res = await this.http.get(url.toString());

        return res.data.data;
    }

    public async getFollowedStreamsWithUsers() {
        const followedStreams = await this.getFollowedStreams();
        const userIds = followedStreams.map(stream => Number(stream.user_id));

        const users = await this.getUsers(userIds);

        const streamsWithUser = followedStreams.map<TwitchFollowedStreamWithUser>((stream, index) => {
            return {
                ...followedStreams[index],
                ...users[index]
            };
        });

        return streamsWithUser;
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
