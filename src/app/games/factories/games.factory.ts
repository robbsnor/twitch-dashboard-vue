import type { CardGameModel } from '../../following/components/CardGame.vue';
import type { TwitchGames, TwitchGetGames } from '../../shared/models/twitch/games.model';
import type { TwitchStreamsWithUser } from '../../shared/models/twitch/streams-with-user.model';
import { TwitchService } from '../../shared/services/twitch.service';
import type { CardGameStream } from '../models/card-game.model';

export class GamesFactory {
    public static mapToCardLive(streams: TwitchStreamsWithUser[]): CardGameStream[] {
        return streams.map<CardGameStream>((stream) => {

            return {
                userId: Number(stream.user_id),
                link: `https://www.twitch.tv/${stream.user_login}`,
                thumbnail: TwitchService.getThumbnail(stream.thumbnail_url, 440),
                title: stream.title,
                viewers: stream.viewer_count,
                name: stream.user_name,
                game: stream.game_name ?? '-',
                avatar: stream.profile_image_url,
            };
        });
    }

    public static mapToCardGame(games: TwitchGames[]): CardGameModel[] {
        return games.map<CardGameModel>((game) => {
            return {
                thumbnail: TwitchService.getGameThumbnail(game.box_art_url),
                name: game.name,
            };
        });
    }
}
