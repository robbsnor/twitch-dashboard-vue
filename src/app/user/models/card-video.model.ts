import type { AdditionalVideoChapter } from "../../shared/models/twitch-additional/additional-video-info.model";

export interface CardVideo {
    link: string;
    thumbnail: string;
    title: string;
    views: number;
    duration: string;
    date: Date;
    id: number;
    chapters?: {
        title: string;
        boxArt: string;
        duration: number;
    }[];
}
