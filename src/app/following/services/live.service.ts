import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams.model";

export class LiveService {
    public static getFavourites(favourites: Number[], streams: TwitchFollowedStreamWithUser[]) {
        const orderedStreams: TwitchFollowedStreamWithUser[] = [];

        favourites.forEach(favId => {
            streams.forEach(stream => {
                if (favId === Number(stream.id)) {
                    orderedStreams.push(stream);
                }
            });
        });

        return orderedStreams;
    }

    public static getNonFavourites(favourites: Number[], streams: TwitchFollowedStreamWithUser[]) {
        return streams.filter(stream => !favourites.includes(Number(stream.id)));
    }
}
