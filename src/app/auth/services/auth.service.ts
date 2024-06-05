import type { TwitchUser } from "../../shared/models/twitch/users.model";
import { LocalStorageService } from "../../shared/services/localstorage.service";
import { TwitchService } from "../../shared/services/twitch.service";

enum LOCALSTORAGE_KEYS {
    ACCESS_TOKEN = 'access_token',
    USER_ID = 'user_id',
    USER_LOGIN = 'user_login',
    USER = 'user',
}

export class AuthService {
    public static async signIn() {
        const accessToken = this.getAccessToken();
        if (!accessToken) return;

        // if we already have a user, don't try getting credentials again
        let currentUser: TwitchUser = LocalStorageService.getItem(LOCALSTORAGE_KEYS.USER);
        if (currentUser) return currentUser;

        // else, get user and store credentials
        const userId = await this.validateToken(accessToken);
        currentUser = await this.getCurrentUser(accessToken, userId);

        return currentUser;
    }

    public static async signOut() {
        const keysToRemove = [LOCALSTORAGE_KEYS.ACCESS_TOKEN, LOCALSTORAGE_KEYS.USER_ID, LOCALSTORAGE_KEYS.USER_LOGIN, LOCALSTORAGE_KEYS.USER];
        keysToRemove.forEach(key => LocalStorageService.removeItem(key));
    }

    public static getAccessToken() {
        return this.getAccessTokenFromUrl() ?? LocalStorageService.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
    };

    private static async validateToken(accessToken: string) {
        const { userId, userLogin } = await TwitchService.validateToken(accessToken);
        LocalStorageService.setItem(LOCALSTORAGE_KEYS.USER_ID, userId);
        LocalStorageService.setItem(LOCALSTORAGE_KEYS.USER_LOGIN, userLogin);

        return Number(userId as string);
    }

    private static async getCurrentUser(accessToken: string, userId: number) {
        const twitchService = new TwitchService(accessToken);
        const currentUser = (await twitchService.getUsers({ ids: [userId] })).data[0];
        LocalStorageService.setItem(LOCALSTORAGE_KEYS.USER, currentUser);

        return currentUser;
    }

    private static getAccessTokenFromUrl() {
        const accessToken = window.location.hash.substring(1).split('&').map(hash => hash.split('='))[0][1];
        LocalStorageService.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, accessToken);

        return accessToken;
    };
}
