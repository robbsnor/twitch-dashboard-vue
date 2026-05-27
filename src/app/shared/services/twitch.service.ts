export class TwitchService {
    public static getStreamThumbnail(
        url: string,
        width = 854,
        height?: number,
        replaceWidthString = '{width}',
        replaceHeightString = '{height}'
    ) {
        if (!height) height = Math.round(width / (16/9)); // aka 16 / 9

        console.log(`height: ${height}`)

        return `${url
            .replace(replaceWidthString, width.toString())
            .replace(replaceHeightString, height.toString())}?t=${Date.now()}`;
    }

    public static getGameThumbnail(url: string, width = 285, height?: number) {
        const ratio = 1.333;
        height = height ? height : Math.round(width * ratio);

        return url.replace('{width}', width.toString()).replace('{height}', height.toString());
    }
}
