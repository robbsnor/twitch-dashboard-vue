import { ImageService } from '../../shared/services/image.service';
import type { CardVideo } from '../models/card-video.model';
import type { TwitchVideo } from '../../shared/models/twitch/videos.model';

export class CardVideoFactory {
    public static mapToCardVideo(videos: TwitchVideo[]) {
        return videos.map<CardVideo>((video) => {
            const thumbnail = video.thumbnail_url.includes('404/404')
                ? 'https://vod-secure.twitch.tv/_404/404_processing_320x180.png'
                : ImageService.craftImage(video.thumbnail_url, undefined, undefined, '%{width}', '%{height}');

            return {
                link: video.url,
                thumbnail: thumbnail,
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
