import { LocalStorageService } from "./localstorage.service";
import { TwitchService } from "./twitch.service";

enum LS_KEYS {
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
        let currentUser = LocalStorageService.getItem(LS_KEYS.USER);
        if (currentUser) return currentUser;

        // else, get user and store credentials
        const userId = await this.validateToken(accessToken);
        currentUser = await this.saveCurrentUser(userId);

        return currentUser;
    }

    public static async signOut() {
        const keysToRemove = [LS_KEYS.ACCESS_TOKEN, LS_KEYS.USER_ID, LS_KEYS.USER_LOGIN, LS_KEYS.USER];
        keysToRemove.forEach(key => LocalStorageService.removeItem(key));
    }

    private static async validateToken(accessToken: string) {
        const { userId, userLogin } = await TwitchService.validateToken(accessToken);
        LocalStorageService.setItem(LS_KEYS.USER_ID, userId);
        LocalStorageService.setItem(LS_KEYS.USER_LOGIN, userLogin);

        return Number(userId as string);
    }

    private static async saveCurrentUser(userId: number) {
        const currentUser = (await TwitchService.getUsers([userId]))[0];
        console.log(currentUser);
        LocalStorageService.setItem(LS_KEYS.USER, currentUser);

        return currentUser;
    }

    private static saveAccessToken() {
        return this.getAccessTokenFromUrl() ?? LocalStorageService.getItem(LS_KEYS.ACCESS_TOKEN);
    };

    private static getAccessTokenFromUrl() {
        const accessToken = window.location.hash.substring(1).split('&').map(hash => hash.split('='))[0][1];
        LocalStorageService.setItem(LS_KEYS.ACCESS_TOKEN, accessToken);

        return accessToken;
    };
}
