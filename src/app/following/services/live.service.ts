import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams-with-user.model";

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
}
