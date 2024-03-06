import { LocalStorageService } from "./localstorage.service";

export class TwitchService {
    public static async validateToken() {
        const token = LocalStorageService.getItem('access_token');

        const res = await fetch('https://id.twitch.tv/oauth2/validate', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        return await res.json();
    }

    public static async getUser(userLogins: string[]) {
        const token = LocalStorageService.getItem('access_token');
        const url = new URL('https://api.twitch.tv/helix/users');
        userLogins.forEach(user => {
            url.searchParams.append('login', user);
        });

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-Id': 'bpjttmchlxdfo9t47z8g3b7snhr9h4',
            }
        });

        return await res.json();
    }

    public static async getFollowedStreams() {
        const token = LocalStorageService.getItem('access_token');
        const url = new URL('https://api.twitch.tv/helix/streams/followed');
        url.searchParams.append('user_id', '23611469');

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-Id': 'bpjttmchlxdfo9t47z8g3b7snhr9h4',
            }
        });

        return await res.json();
    }
}
