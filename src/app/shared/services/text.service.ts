
export class TextService {
    /**
     * Return the single or plural text based on the input number.
     *
     * @param number - The input number.
     * @param singleText - The text to be returned when the number is 1.
     * @param pluralText - The text to be returned when the number is not 1.
     * @returns The single or plural text based on the input number.
     */
    public static singleOrPlural(number: number, singleText: string, pluralText: string) {
        return number !== 1 ? pluralText : singleText;
    }
}
