export class TwitchService {
    public static getThumbnail(
        url: string,
        width = 320,
        height?: number,
        replaceWidthString = '{width}',
        replaceHeightString = '{height}'
    ) {
        if (!height) height = Math.ceil(width / 1.778); // aka 16 / 9

        return url.replace(replaceWidthString, width.toString()).replace(replaceHeightString, height.toString());
    }
}
