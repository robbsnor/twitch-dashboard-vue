import axios, { type InternalAxiosRequestConfig } from "axios";
import { LocalStorageService } from "./localstorage.service";
import { useAuthStore } from "../stores/auth.store";

export class TwitchService {
    private authStore = useAuthStore();
    private http = axios.create();
    private accessToken?: string;

    constructor() {
        this.accessToken = LocalStorageService.getItem('access_token');
        this.http.interceptors.request.use((config) => this.authInterceptorFunction(config));
    }

    public async validateToken() {
        this.http.interceptors.request.eject(this.clientIdInterceptor);
        const res = await this.http.get('https://id.twitch.tv/oauth2/validate');
        this.http.interceptors.request.use((config) => this.clientIdInterceptorFunction(config));
        return res.data;
    }

    public async getUser(userLogins: string[]) {
        const url = new URL('https://api.twitch.tv/helix/users');
        userLogins.forEach(user => {
            url.searchParams.append('login', user);
        });
        const res = await this.http.get(url.toString());
        return res.data;
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
        if (!this.accessToken) return config;
        config.headers.set('Authorization', `Bearer ${this.accessToken}`);
        return config;
    };

    private clientIdInterceptorFunction(config: InternalAxiosRequestConfig<any>) {
        config.headers.set('Client-Id', `bpjttmchlxdfo9t47z8g3b7snhr9h4`);
        return config;
    }

    private clientIdInterceptor = this.http.interceptors.request.use((config) => this.clientIdInterceptorFunction(config));
    // end interceptors
}
