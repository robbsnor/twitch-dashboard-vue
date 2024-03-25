import { ImageService } from '../../shared/services/image.service';
import type { CardVideo } from '../models/card-video.model';
import type { TwitchVideo } from '../../shared/models/twitch/videos.model';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import type { UserHeaderProps } from '../components/UserHeader.vue';

export class UserFactory {
    public static mapToCards(videos: TwitchVideo[]): CardVideo[] {
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

    public static mapToUserHeader(user: TwitchUser): UserHeaderProps {
        return {
            username: user.display_name,
            avatar: user.profile_image_url,
            followers: 200,
            isFavourite: false,
        };
    }
}
