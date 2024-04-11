import type { TwitchUser } from "../../shared/models/twitch/users.model";
import type { CardUserProps } from "../components/CardUser.vue";

export class UserFactory {
    public static mapToCardUser(users: TwitchUser[]) {
        return users.map<CardUserProps>((user) => {
            return {
                name: user.display_name,
                image: user.profile_image_url,
            };
        });
    }
}
