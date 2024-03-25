import { ImageService } from '../../shared/services/image.service';
import type { CardVideoModel } from '../models/card-video.model';
import type { TwitchVideo } from '../../shared/models/twitch/videos.model';
import type { TwitchUser } from '../../shared/models/twitch/users.model';

export class UserFactory {
    public static mapToVideo(videos: TwitchVideo[]) {
        return videos.map<CardVideoModel>((video) => {
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

    // public static mapToUserHeader(user: TwitchUser) {
    //     return {
    //         name: user.display_name,
    //         avatar: user.profile_image_url,
    //         bio: user.description,
    //         views: user.view_count,
    //         followers: user.followers,
    //         following: user.following,
    //         id: parseInt(user.id),
    //         login: user.login,
    //         type: user.type,
    //         offline_image: user.offline_image_url,
    //         cover_image: user.profile_banner,
    //     }
    // }
}
