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

        // minutes
        let minsAgo = DateService.getTimeBetweenDates(oldDate, undefined, 'minutes');
        if (minsAgo < 60) {
            minsAgo = Math.floor(minsAgo);
            return `${TextService.singleOrPlural(minsAgo, `${minsAgo} minute ago`, `${minsAgo} minutes ago`)}`;
        }

        // hours
        let hoursAgo = DateService.getTimeBetweenDates(oldDate, undefined, 'hours');
        if (hoursAgo < 24) {
            hoursAgo = Math.floor(hoursAgo);
            return `${TextService.singleOrPlural(hoursAgo, `${hoursAgo} hour ago`, `${hoursAgo} hours ago`)}`;
        }

        // days
        let daysAgo = DateService.getTimeBetweenDates(oldDate);
        if (daysAgo < 31) {
            daysAgo = Math.round(daysAgo);
            return `${TextService.singleOrPlural(daysAgo, `${daysAgo} day ago`, `${daysAgo} days ago`)}`;
        }

        // months
        let monthsAgo = DateService.getTimeBetweenDates(oldDate, undefined, 'months');
        if (monthsAgo < 11.5) {
            monthsAgo = Math.round(monthsAgo);
            return TextService.singleOrPlural(monthsAgo, `${monthsAgo} month ago`, `${monthsAgo} months ago`);
        }

        // years
        else {
            const yearsAgo = Math.round(DateService.getTimeBetweenDates(oldDate, undefined, 'years'));
            return TextService.singleOrPlural(yearsAgo, `${yearsAgo} year ago`, `${yearsAgo} years ago`);
        }
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
