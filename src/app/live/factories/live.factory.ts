import { ImageService } from '../../shared/services/image.service';
import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams.model";
import type { CardLive } from "../models/card-live.model";

export class LiveFactory {
    public static mapToCardLiveSmall(streams: TwitchFollowedStreamWithUser[]) {
        return LiveFactory.mapToCardLive(streams);
    }

    public static mapToCardLiveNormal(streams: TwitchFollowedStreamWithUser[]) {
        return LiveFactory.mapToCardLive(streams);
    }

    public static mapToCardLiveFancy(streams: TwitchFollowedStreamWithUser[]) {
        return LiveFactory.mapToCardLive(streams, 720);
    }

    private static mapToCardLive(streams: TwitchFollowedStreamWithUser[], thumbnailWidth?: number) {
        return streams.map<CardLive>((stream) => {
            return {
                userId: Number(stream.user_id),
                link: `https://www.twitch.tv/${stream.user_login}`,
                thumbnail: ImageService.craftImage(stream.thumbnail_url, thumbnailWidth),
                title: stream.title,
                viewers: stream.viewer_count,
                name: stream.user_name,
                game: stream.game_name ?? '-',
                avatar: stream.profile_image_url,
            };
        });
    }
}
