import { useTitle } from "@vueuse/core";

export class TitleService {
    public static setTitle(title: string) {
        const pageTitle = useTitle();
        pageTitle.value = `${title} | Twitch Dashboard`;
    }
}
