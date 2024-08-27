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

    public static getGameThumbnail(url: string, width = 285, height?: number) {
        const ratio = 1.333;
        height = height ? height : Math.round(width * ratio);

        return url.replace('{width}', width.toString()).replace('{height}', height.toString());
    }
}
