import { NumberService } from "../../shared/services/number.service";
import { TimeService } from "../../shared/services/time.service";

export class CardLiveService {
    public static getViewers(viewers: number) {
        return NumberService.abbreviateNumber(viewers);
    }

    public static getUptime(startedAt: Date) {
        return TimeService.formatUptime(startedAt);
    }
}
