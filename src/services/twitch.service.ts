import axios, { type InternalAxiosRequestConfig } from "axios";
import { LocalStorageService } from "./localstorage.service";

export class TwitchService {
    private http = axios.create();
    private token?: string;

    constructor() {
        this.token = LocalStorageService.getItem('access_token');
        this.http.interceptors.request.use((config) => this.authInterceptorFunction(config));
    }

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

    public static async getUsers(userIds: number[]) {
        const token = LocalStorageService.getItem('access_token');
        const url = new URL('https://api.twitch.tv/helix/users');
        userIds.forEach(id => {
            url.searchParams.append('id', id.toString());
        });

        const res = await axios.get(url.toString(), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-Id': `bpjttmchlxdfo9t47z8g3b7snhr9h4`,
            }
        });

        return res.data.data;
    }

    public async getFollowedStreams() {
        const url = new URL('https://api.twitch.tv/helix/streams/followed');
        url.searchParams.append('user_id', '23611469');
        const res = await this.http.get(url.toString());

        return res.data.data;
    }

    public async getVideos(userId: number) {
        const url = new URL('https://api.twitch.tv/helix/videos');
        url.searchParams.append('user_id', userId.toString());
        const res = await this.http.get(url.toString());

        return res.data.data;
    }

    // interceptors
    private authInterceptorFunction(config: InternalAxiosRequestConfig<any>) {
        if (!this.token) return config;
        config.headers.set('Authorization', `Bearer ${this.token}`);
        return config;
    };

    private clientIdInterceptorFunction(config: InternalAxiosRequestConfig<any>) {
        config.headers.set('Client-Id', `bpjttmchlxdfo9t47z8g3b7snhr9h4`);
        return config;
    }

    private clientIdInterceptor = this.http.interceptors.request.use((config) => this.clientIdInterceptorFunction(config));
    // end interceptors
}
