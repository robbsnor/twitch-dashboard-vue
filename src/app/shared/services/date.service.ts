import type { DurationUnit } from 'luxon';
import { DateTime, Interval } from 'luxon';
import { TextService } from "./text.service";

export class DateService {
    /** Get a human-readable string representing the time elapsed between an older date and now */
    /**
     * Returns a formatted string representing the time between the given date and the current date.
     * @param oldDate - The date to calculate the time difference from.
     * @returns A formatted string representing the time between the given date and the current date.
     */
    public static getFormattedTimeBetweenDates(oldDate: Date): string {
        const minutesAgo = this.getTimeBetweenDates(oldDate, undefined, 'minutes');
        const hoursAgo = this.getTimeBetweenDates(oldDate, undefined, 'hours');
        const daysAgo = this.getTimeBetweenDates(oldDate);
        const monthsAgo = this.getTimeBetweenDates(oldDate, undefined, 'months');
        const yearsAgo = this.getTimeBetweenDates(oldDate, undefined, 'years');

        if (minutesAgo < 60) return `${TextService.singleOrPlural(minutesAgo, `${minutesAgo} minute ago`, `${minutesAgo} minutes ago`)}`;
        if (hoursAgo < 24) return `${TextService.singleOrPlural(hoursAgo, `${hoursAgo} hour ago`, `${hoursAgo} hours ago`)}`;
        if (daysAgo < 31) return `${TextService.singleOrPlural(daysAgo, `${daysAgo} day ago`, `${daysAgo} days ago`)}`;
        if (monthsAgo < 11.5) return TextService.singleOrPlural(monthsAgo, `${monthsAgo} month ago`, `${monthsAgo} months ago`);
        return TextService.singleOrPlural(yearsAgo, `${yearsAgo} year ago`, `${yearsAgo} years ago`);
    }

    /**
     * Calculates the time difference between two dates.
     * @param olderDate - The older date.
     * @param newerDate - The newer date. Defaults to the current date and time.
     * @param unit - The unit of time to calculate the difference in. Defaults to 'days'.
     * @returns The time difference between the two dates in the specified unit.
     */
    public static getTimeBetweenDates(olderDate: Date, newerDate = DateTime.now(), unit: DurationUnit = 'days'): number {
        const past = DateTime.fromISO(new Date(olderDate).toISOString());
        const diff = Interval.fromDateTimes(past, newerDate);

        return diff.length(unit);
    }
}
