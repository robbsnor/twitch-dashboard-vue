import { ImageService } from '../../shared/services/image.service';
import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams.model";
import type { CardVideo } from '../models/card-video.model';
import type { TwitchVideo } from '../../shared/models/twitch/videos.model';

export class CardVideoFactory {
    public static mapToCardVideo(videos: TwitchVideo[]) {
        return videos.map<CardVideo>((video) => {
            return {
                link: video.url,
                thumbnail: ImageService.craftImage(video.thumbnail_url, undefined, undefined, '%{width}', '%{height}'),
                title: video.title,
                duration: video.duration,
                views: video.view_count,
                date: video.published_at,
                id: parseInt(video.id),
                // chapters: scrapedVideo?.chapters
            };
        });
    }
}
