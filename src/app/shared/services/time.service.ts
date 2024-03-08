import { NumberService } from './number.service';

export class TimeService {
    /**
     * Converts time with a format of "2h3m40s" to "2:03:40".
     *
     * @param time - The time string to be formatted.
     * @returns The formatted time string.
     */
    public static formatTime(time: string): string {
        const timeArray = time.split(/[hms]/);
        const formattedTime = timeArray.map((timeUnit) => NumberService.singleToDoubleDigits(parseInt(timeUnit))).join(':');

        return formattedTime;
    }
}
