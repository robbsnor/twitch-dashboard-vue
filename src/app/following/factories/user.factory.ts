import type { TwitchUser } from "../../shared/models/twitch/users.model";
import type { CardUserProps } from "../components/CardUser.vue";

export class UserFactory {
    public static mapToCardUser(users: TwitchUser[]) {
        return users.map<CardUserProps>((user) => {
            return {
                name: user.display_name,
                avatar: user.profile_image_url,
                backgroundImage: user.offline_image_url?.replace('1920x1080', '192x108'),
            };
        });
    }
}
