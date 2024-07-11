export interface AdditionalVideoInfo {
    userId: number;
    username: string;
    videoId: number;
    thumbnail?: string;
    title: string;
    chapters: AdditionalVideoChapter[];
}

export interface AdditionalVideoChapter {
    title: string;
    boxArt: string;
    duration: string;
}

