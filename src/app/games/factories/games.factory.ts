import type { TwitchGameStreams } from '../../shared/models/twitch/game-streams.model';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import { TwitchService } from '../../shared/services/image.service';
import type { CardGameStream } from '../models/card-game.model';

export class GamesFactory {
    public static mapToCardLive(streams: TwitchGameStreams[], users?: TwitchUser[]) {
        return streams.map<CardGameStream>((stream) => {
            const user = users?.find((user) => user.id === stream.user_id);

            return {
                userId: Number(stream.user_id),
                link: `https://www.twitch.tv/${stream.user_login}`,
                thumbnail: TwitchService.getThumbnail(stream.thumbnail_url, 440),
                title: stream.title,
                viewers: stream.viewer_count,
                name: stream.user_name,
                game: stream.game_name ?? '-',
                avatar: user?.profile_image_url,
            };
        });
    }
}
