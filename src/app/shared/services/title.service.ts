import { useTitle } from "@vueuse/core";

export class TitleService {
    public static setTitle(newTitle: string) {
        const title = useTitle();
        title.value = `Twitch Dashboard | ${newTitle}`; // change current title
    }
}
