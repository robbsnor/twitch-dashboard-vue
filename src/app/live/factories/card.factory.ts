import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams.model";
import type { CardLive } from "../models/card.model";

export class CardFactory {
    public static mapToCardLive(
        streams: TwitchFollowedStreamWithUser[],
        thumbnailWidth?: number
    ): CardLive[] {
        return streams.map((stream) => {
            return {
                link: `https://www.twitch.tv/${stream.user_login}`,
                // thumbnail: craftImage(stream.thumbnail_url, thumbnailWidth),
                thumbnail: 'image.png',
                title: stream.title,
                viewers: stream.viewer_count,
                name: stream.user_name,
                game: stream.game_name ?? '-',
                avatar: stream.profile_image_url,
            };
        });
    }
}
