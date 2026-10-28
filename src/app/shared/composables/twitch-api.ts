const HELIX_BASE_URL = 'https://api.twitch.tv/helix';

// ---------- Types ----------

export interface TwitchClientOptions {
    /** Your app's Client ID (from the Twitch dev console). */
    clientId: string;
    /** A *user* access token. For followed streams it needs the `user:read:follows` scope. */
    accessToken: string;
}

export interface Pagination {
    cursor?: string;
}

export interface TwitchResponse<T> {
    data: T[];
    pagination?: Pagination;
}

export interface FollowedStream {
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    game_name: string;
    type: 'live' | '';
    title: string;
    viewer_count: number;
    started_at: string; // ISO 8601
    language: string;
    thumbnail_url: string; // contains {width}x{height} placeholders
    tag_ids: string[]; // deprecated by Twitch, usually empty
    tags: string[];
    is_mature: boolean;
}

export interface GetFollowedStreamsParams {
    /** ID of the user whose followed streams you want. Must match the token's user. */
    userId: string;
}

export interface TwitchGame {
    id: string;
    name: string;
    box_art_url: string;
    igdb_id: string;
}

export interface GetGamesParams {
    ids?: string[];
    names?: string[];
    igdbIds?: string[];
}

export interface TwitchUser {
    id: string;
    login: string;
    display_name: string;
    type: 'admin' | 'global_mod' | 'staff' | '';
    broadcaster_type: 'affiliate' | 'partner' | '';
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    /** Deprecated by Twitch, may be 0 or missing. */
    view_count?: number;
    /** Only returned when the token has the `user:read:email` scope and the user is the token's owner. */
    email?: string;
    created_at: string; // ISO 8601
}

export interface GetUsersParams {
    /** Twitch user IDs. */
    ids?: string[];
    /** Twitch login names (lowercase usernames). */
    logins?: string[];
}

export type QueryParams = Record<string, string | number | string[] | undefined>;

export interface RequestOptions {
    /** HTTP method. Default: 'GET'. */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    /** Stop paginating once this many items have been collected. Default: 999. */
    maxItems?: number;
    /** Items requested per page (`first`), 1-100. Default: 100. */
    pageSize?: number;
}

/** The subset of RequestOptions that callers of the public methods may override. */
export type FetchOptions = Pick<RequestOptions, 'maxItems' | 'pageSize'>;

// ---------- Errors ----------

export class TwitchApiError extends Error {
    constructor(public readonly status: number, public readonly body: unknown, message?: string) {
        super(message ?? `Twitch API error (${status})`);
        this.name = 'TwitchApiError';
    }
}

// ---------- Client ----------

export class TwitchClient {
    private readonly clientId: string;
    private readonly accessToken: string;

    constructor(options: TwitchClientOptions) {
        this.clientId = options.clientId;
        this.accessToken = options.accessToken;
    }

    /**
     * GET /helix/streams/followed
     * Returns every live stream the user follows (all pages, up to `options.maxItems`).
     */
    async getFollowedStreams(params: GetFollowedStreamsParams, options?: FetchOptions): Promise<FollowedStream[]> {
        return this.request<FollowedStream>(
            '/streams/followed',
            {
                user_id: params.userId,
            },
            options
        );
    }

    /**
     * GET /helix/games
     * Looks up games by Twitch ID, name, or IGDB ID.
     */
    async getGames(params: GetGamesParams, options?: FetchOptions): Promise<TwitchGame[]> {
        return this.request<TwitchGame>(
            '/games',
            {
                id: params.ids,
                name: params.names,
                igdb_id: params.igdbIds,
            },
            options
        );
    }

    async getUsers(params: GetUsersParams, options?: FetchOptions): Promise<TwitchUser[]> {
        return this.request<TwitchUser>(
            '/users',
            {
                id: params.ids,
                login: params.logins,
            },
            options
        );
    }

    async getTopGames(options?: FetchOptions): Promise<TwitchGame[]> {
        return this.request<TwitchGame>('/games/top');
    }

    // ---------- Internals ----------

    /**
     * Performs a request against Helix and follows `pagination.cursor` until
     * Twitch stops returning one, or `maxItems` has been reached.
     * Returns all collected items as a flat array (never more than `maxItems`).
     */
    private async request<T>(path: string, query: QueryParams = {}, options: RequestOptions = {}): Promise<T[]> {
        const { method = 'GET', maxItems = 999, pageSize = 100 } = options;

        const all: T[] = [];
        let after: string | undefined;

        do {
            // Never ask for more than we still need.
            const first = Math.max(1, Math.min(pageSize, 100, maxItems - all.length));

            const url = new URL(`${HELIX_BASE_URL}${path}`);

            for (const [key, value] of Object.entries({ first, ...query, after })) {
                if (Array.isArray(value)) {
                    value.forEach((item) => url.searchParams.append(key, String(item)));
                } else if (value !== undefined) {
                    url.searchParams.set(key, String(value));
                }
            }

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Client-Id': this.clientId,
                },
            });

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new TwitchApiError(res.status, body);
            }

            const page = (await res.json()) as TwitchResponse<T>;
            all.push(...page.data);
            after = page.pagination?.cursor;
        } while (after && all.length < maxItems);

        return all.slice(0, maxItems);
    }
}

// ---------- Usage ----------
// const twitch = new TwitchClient({
//   clientId: process.env.TWITCH_CLIENT_ID!,
//   accessToken: process.env.TWITCH_USER_TOKEN!,
// });
// const streams = await twitch.getFollowedStreams({ userId: "123456789" }, { maxItems: 25 });
