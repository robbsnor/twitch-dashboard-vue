import type { TwitchFollowedStreamWithUser } from "../../shared/models/twitch/followed-streams.model";

export class LiveService {
    public static orderFavorites(favourites: Number[], streams: TwitchFollowedStreamWithUser[]) {
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
}
