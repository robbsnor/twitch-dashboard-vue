export interface TwitchGetGames {
    data: TwitchGames[];
}

export interface TwitchGames {
    id: string;
    name: string;
    box_art_url: string;
    igdb_id: string;
}
