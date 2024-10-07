export interface CardLive {
    userId: number;
    link: string;
    thumbnail: string;
    thumbnailLarge: string;
    title: string;
    viewers: number;
    avatar: string;
    name: string;
    game: string;
}

export type CardLiveSize = 'small' | 'normal' | 'fancy';
