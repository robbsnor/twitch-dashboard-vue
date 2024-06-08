export interface CardVideo {
    link: string;
    thumbnail: string;
    title: string;
    views: number;
    duration: string;
    date: Date;
    id: number;
    chapters?: CardVideoChapter[];
}

export interface CardVideoChapter {
    title: string;
    boxArt: string;
    duration: number;
}
