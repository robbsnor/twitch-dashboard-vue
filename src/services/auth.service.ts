import { LocalStorageService } from "./localstorage.service";
import { TwitchService } from "./twitch.service";

enum AUTH_KEYS {
    ACCESS_TOKEN = 'access_token',
    USER_ID = 'user_id',
    USER_LOGIN = 'user_login',
    USER = 'user',
}

export class AuthService {
    public static async signIn() {
        const accessToken = this.saveAccessToken();
        if (!accessToken) return;

        // if we already have a user, don't try getting credentials again
        let currentUser = LocalStorageService.getItem(AUTH_KEYS.USER);
        if (currentUser) return currentUser;

        // else, get user and store credentials
        const userId = await this.validateToken(accessToken);
        currentUser = await this.saveCurrentUser(userId);

        return currentUser;
    }

    public static async signOut() {
        const keysToRemove = [AUTH_KEYS.ACCESS_TOKEN, AUTH_KEYS.USER_ID, AUTH_KEYS.USER_LOGIN, AUTH_KEYS.USER];
        keysToRemove.forEach(key => LocalStorageService.removeItem(key));
    }

    private static async validateToken(accessToken: string) {
        const { userId, userLogin } = await TwitchService.validateToken(accessToken);
        LocalStorageService.setItem(AUTH_KEYS.USER_ID, userId);
        LocalStorageService.setItem(AUTH_KEYS.USER_LOGIN, userLogin);

        return Number(userId as string);
    }

    private static async saveCurrentUser(userId: number) {
        const currentUser = await TwitchService.getUsers([userId]);
        LocalStorageService.setItem(AUTH_KEYS.USER, currentUser);

        return currentUser;
    }

    private static saveAccessToken() {
        return this.getAccessTokenFromUrl() ?? LocalStorageService.getItem(AUTH_KEYS.ACCESS_TOKEN);
    };

    private static getAccessTokenFromUrl() {
        const accessToken = window.location.hash.substring(1).split('&').map(hash => hash.split('='))[0][1];
        LocalStorageService.setItem(AUTH_KEYS.ACCESS_TOKEN, accessToken);
        return accessToken;
    };
}
