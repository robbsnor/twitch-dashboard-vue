import type { VideoTypesModel } from './../../shared/models/twitch/video-types.model';

export interface FormModel {
    search: string;
    category: string;
    type: VideoTypesModel;
    showTime: boolean;
    showThumbnails: boolean;
}
