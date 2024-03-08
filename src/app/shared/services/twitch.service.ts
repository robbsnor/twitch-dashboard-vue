import axios, { type InternalAxiosRequestConfig } from "axios";
import { AuthService } from "../../auth/services/auth.service";

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

    public async getUsers(userIds: number[]) {
        const url = new URL('https://api.twitch.tv/helix/users');
        userIds.forEach(id => {
            url.searchParams.append('id', id.toString());
        });
        const res = await this.http.get(url.toString());

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
        config.headers.set('Authorization', `Bearer ${this.accessToken}`);
        return config;
    };

    private clientIdInterceptorFunction(config: InternalAxiosRequestConfig<any>) {
        config.headers.set('Client-Id', `bpjttmchlxdfo9t47z8g3b7snhr9h4`);
        return config;
    }
    // end interceptors
}
