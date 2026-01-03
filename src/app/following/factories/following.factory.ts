import { TwitchService } from '../../shared/services/twitch.service';
import type { TwitchFollowedStreamWithUser } from '../../shared/models/twitch/followed-streams-with-user.model';
import type { CardLive } from '../models/card-live.model';

export class FollowingFactory {
    public static mapToCardLiveSmall(streams: TwitchFollowedStreamWithUser[]) {
        return FollowingFactory.mapToCardLive(streams);
    }

    public static mapToCardLiveNormal(streams: TwitchFollowedStreamWithUser[]) {
        return FollowingFactory.mapToCardLive(streams);
    }

    public static mapToCardLiveFancy(streams: TwitchFollowedStreamWithUser[]) {
        return FollowingFactory.mapToCardLive(streams, 470); // 470
    }

    private static mapToCardLive(streams: TwitchFollowedStreamWithUser[], thumbnailWidth?: number) {
        const randomString = Date.now();

        return streams.map<CardLive>((stream) => {
            const thumbnail = TwitchService.getStreamThumbnail(stream.thumbnail_url, thumbnailWidth);
            const thumbnailToPreventCaching = `${thumbnail}?t=${randomString}`;

            return {
                userId: Number(stream.user_id),
                link: `https://www.twitch.tv/${stream.user_login}`,
                thumbnail: thumbnailToPreventCaching,
                title: stream.title,
                viewers: stream.viewer_count,
                name: stream.user_name,
                game: stream.game_name || '-',
                avatar: stream.profile_image_url,
                startedAt: stream.started_at,
            };
        });
    }
}
