export class LocalStorageService {
    public static getItem(key: string) {
        const item = localStorage.getItem(key);
        if (!item) return;

        return JSON.parse(item);
    }

    public static setItem(key: string, data?: any) {
        if (!data) return;
        localStorage.setItem(key, JSON.stringify(data));
    }

    public static removeItem(name: string) {
        localStorage.removeItem(name);
    }
}
