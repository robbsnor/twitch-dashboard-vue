export class ImageService {
    public static craftImage(
        url: string,
        width = 470,
        height?: number,
        replaceWidthString = '{width}',
        replaceHeightString = '{height}'
    ) {
        if (!height) height = Math.ceil(width / 1.777); // aka 16 / 9

        return url.replace(replaceWidthString, width.toString()).replace(replaceHeightString, height.toString());
    }
}
