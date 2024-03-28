import type { VideoTypesModel } from './../../shared/models/twitch/video-types.model';

export interface Form {
    search: string | null;
    type: VideoTypesModel;
    showDuration: boolean;
    showThumbnail: boolean;
}
