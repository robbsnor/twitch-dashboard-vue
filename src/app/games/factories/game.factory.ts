import type { CardLive } from '../../following/models/card-live.model';
import type { TwitchGameStreams } from '../../shared/models/twitch/game-streams.model';
import { ImageService } from '../../shared/services/image.service';

export class GameFactory {
    public static mapToCardLive(streams: TwitchGameStreams[], thumbnailWidth?: number) {
        return streams.map<CardLive>((stream) => {
            return {
                userId: Number(stream.user_id),
                link: `https://www.twitch.tv/${stream.user_login}`,
                thumbnail: ImageService.craftImage(stream.thumbnail_url, thumbnailWidth),
                title: stream.title,
                viewers: stream.viewer_count,
                name: stream.user_name,
                game: stream.game_name ?? '-',
                // avatar: stream.,
            };
        });
    }
}
