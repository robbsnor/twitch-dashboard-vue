export interface CardLive {
    userId: number;
    link: string;
    thumbnail: string;
    title: string;
    viewers: number;
    avatar?: string;
    name: string;
    game: string;
    color?: string;
}

export type CardLiveSize = 'small' | 'normal' | 'fancy';

