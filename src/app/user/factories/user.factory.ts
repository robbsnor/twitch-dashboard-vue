import type { AdditionalVideosInfo } from '../../shared/models/twitch-additional/additional-video-info.model';
import type { TwitchUser } from '../../shared/models/twitch/users.model';
import type { TwitchVideo } from '../../shared/models/twitch/videos.model';
import { TwitchService } from '../../shared/services/image.service';
import type { UserHeaderProps } from '../components/UserHeader.vue';
import type { CardVideo } from '../models/card-video.model';

export class UserFactory {
    public static mapToCards(videos: TwitchVideo[], additionalVideosInfo?: AdditionalVideosInfo[]): CardVideo[] {
        return videos.map<CardVideo>((video) => {
            const thumbnail = video.thumbnail_url.includes('404/404')
                ? 'https://vod-secure.twitch.tv/_404/404_processing_320x180.png'
                : TwitchService.getThumbnail(video.thumbnail_url, undefined, undefined, '%{width}', '%{height}');

            const additionalVideoInfo = additionalVideosInfo?.find((scrapedVideo: any) => scrapedVideo.videoId === Number(video.id));
            const chapters = additionalVideoInfo?.chapters.map((chapter) => ({ ...chapter, duration: Number(chapter.duration) }));

            return {
                link: video.url,
                thumbnail: thumbnail,
                title: video.title,
                duration: video.duration,
                views: video.view_count,
                date: new Date(video.published_at),
                id: Number(video.id),
                chapters: chapters,
            };
        });
    }

    public static mapToUserHeader(user: TwitchUser, followers: number): UserHeaderProps {
        const banner = user.offline_image_url
            ? user.offline_image_url
            : 'https://static-cdn.jtvnw.net/jtv_user_pictures/340bf118-4558-4d0a-8285-166043494a37-profile_banner-480.jpeg';
        // : 'https://images.unsplash.com/photo-1584204559709-ca7d413229eb?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

        return {
            username: user.display_name,
            banner: banner,
            avatar: user.profile_image_url,
            followers: followers,
            isFavourite: false,
        };
    }
}
