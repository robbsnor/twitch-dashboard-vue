import type { VideoTypesModel } from './../../shared/models/twitch/video-types.model';

export interface Form {
    search: string;
    type: VideoTypesModel;
    showDuration: boolean;
    showThumbnails: boolean;
}
