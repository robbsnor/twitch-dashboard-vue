export class NumberService {
    /**
     * Formats a number by adding a 'k' suffix if the number is greater than 999.
     * @param num - The number to format.
     * @returns The formatted number as a string.
     */
    public static formatThousands(num: number) {
        if (Math.abs(num) > 999) {
            return Math.sign(num) * (Number((Math.abs(num) / 1000).toFixed(1))) + 'k';
        }

        return num.toString();
    }

    /**
     * Converts single digits to double digits: 2 becomes 02.
     * @param num - The number to convert.
     * @returns The converted number as a string.
     */
    public static singleToDoubleDigits(num: number) {
        const amountOfNumbers = num.toString().length;

        return (amountOfNumbers === 1) ? `0${num}` : `${num}`;
    }

    /**
     * Checks if a number is even.
     * @param num The number to check.
     * @returns True if the number is even, false otherwise.
     */
    public static isEven(num: number): boolean {
        return num % 2 === 0;
    }

    /**
     * Checks if a number is odd.
     * @param num The number to check.
     * @returns True if the number is odd, false otherwise.
     */
    public static isOdd(num: number): boolean {
        return num % 2 !== 0;
    }

    /**
     * Generates a random number between a minimum and maximum value.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns The random number generated.
     */
    public static generateRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
