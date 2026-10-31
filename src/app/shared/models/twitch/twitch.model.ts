export interface Pagination {
    cursor?: string;
}

export interface TwitchResponse<T> {
    total?: string;
    data: T[];
    pagination?: Pagination;
}

export type QueryParams = Record<string, string | number | string[] | undefined>;

export interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    maxItems?: number;
    pageSize?: number;
}

export type FetchOptions = Pick<RequestOptions, 'maxItems' | 'pageSize'>;

//

export interface GetGamesParams {
    ids?: string[];
    names?: string[];
    igdbIds?: string[];
}

export interface GetUsersParams {
    ids?: string[];
    logins?: string[];
}

export interface GetFollowedChannelsParams {
    ids?: string[];
}

export interface GetVideosParams {
    videoIds?: string[];
    userIds?: string[];
    gameIds?: string[];
}

export interface GetStreamsParams {
    userIds?: string[];
    userLogins?: string[];
    gameIds?: string[];
}

export interface CheckUserSubscriptionParams {
    broadcasterId?: string;
    userId?: string;
}

export interface GetFollowedStreamsParams {
    ids?: string[];
}
