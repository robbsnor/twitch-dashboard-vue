import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams-with-user.model";
import { TwitchApiService } from "../../shared/services/twitch-api.service";
import { useFavouriteStore } from "../../shared/stores/favourites.store";
import { LiveService } from "../services/live.service";

const favourtieStore = useFavouriteStore();
const twitchApiService = new TwitchApiService();

export interface Streams {
    favouriteStreams: TwitchFollowedStreamWithUser[];
    nonFavouriteStreams: TwitchFollowedStreamWithUser[];
}

export class FollowingFacade {
    public static async getStreams() {
        const streams = await twitchApiService.getFollowedStreamsWithUsers();

        const favouriteStreams = LiveService.getFavourites(
            favourtieStore.favouriteStreamerIds,
            streams
        );

        const nonFavouriteStreams = LiveService.getNonFavourites(
            favourtieStore.favouriteStreamerIds,
            streams
        );

        return {
            favouriteStreams,
            nonFavouriteStreams
        } as Streams;
    }

    public static async getSchedules() {
        return LiveService.getSchedule();
    }
}
