export class LocalStorageService {
    public static getItem(name: string) {
        const item = localStorage.getItem('access_token');
        if (!item) return;

        return JSON.parse(item);
    }

    public static setItem(name: string, data: any) {
        localStorage.setItem(name, JSON.stringify(data));
    }

    public static removeItem(name: string) {
        localStorage.removeItem(name);
    }
}
