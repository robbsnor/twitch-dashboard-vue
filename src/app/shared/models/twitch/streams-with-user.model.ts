import type { TwitchStream } from './get-streams';
import type { TwitchUser } from './users.model';

export interface TwitchStreamsWithUser extends TwitchStream, TwitchUser {}
