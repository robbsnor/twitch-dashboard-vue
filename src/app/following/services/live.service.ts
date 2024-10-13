import _ from "lodash";
import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams-with-user.model";
import { TwitchApiService } from "../../shared/services/twitch-api.service";
import { useFavouriteStore } from "../../shared/stores/favourites.store";
import type { TwitchScheduleSegment } from "../../shared/models/twitch/schedule.model";

const twitchApiService = new TwitchApiService();
const favourtieStore = useFavouriteStore();

export interface ScheduleModel {
    id: string;
    avatar: string;
    name: string;
    title: string | null;
    startTime: string;
    endTime: string;
    category: {
        id: number;
        name: string;
    } | null;
}

export class LiveService {
    public static getFavourites(favouriteIds: Number[], streams: TwitchFollowedStreamWithUser[]) {
        const orderedStreams: TwitchFollowedStreamWithUser[] = [];

        favouriteIds.forEach(favId => {
            streams.forEach(stream => {
                if (favId === Number(stream.id)) {
                    orderedStreams.push(stream);
                }
            });
        });

        return orderedStreams;
    }

    public static getNonFavourites(favouriteIds: Number[], streams: TwitchFollowedStreamWithUser[]) {
        return streams.filter(stream => !favouriteIds.includes(Number(stream.id)));
    }

    public static async getSchedule() {
        const items = await twitchApiService.getScheduleWithUsers(favourtieStore.favouriteStreamerIds);

        return items.reduce<ScheduleModel[]>((acc, item) => {
            const firstSegment = _.first(item.schedule.segments);
            if (!firstSegment) return acc;

            acc.push({
                id: firstSegment.id,
                avatar: item.user.profile_image_url,
                name: item.user.display_name,
                title: firstSegment.title,
                startTime: firstSegment.start_time,
                endTime: firstSegment.end_time,
                category: firstSegment.category,
            });

            return acc;
        }, []);
    }
}
