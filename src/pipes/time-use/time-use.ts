import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'timeUse',
    pure: false
})
export class TimeUsePipe implements PipeTransform {
    private timer: number;
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private ngZone: NgZone,
    ) { }
    transform(value: string, value2: string) {
        moment.locale('th');
        this.removeTimer();
        let d = new Date(moment(value).unix() * 1000);
        let now = (value2 == null) ? new Date() : new Date(moment(value2).unix() * 1000);
        let milliSec = now.getTime() - d.getTime();
        let min = Math.floor(milliSec / 1000 / 60);
        if (value2 == null) {
            let timeToUpdate = 1000 * 60 - (milliSec % (1000 * 60));
            this.timer = this.ngZone.runOutsideAngular(() => {
                if (typeof window !== 'undefined') {
                    return window.setTimeout(() => {
                        this.ngZone.run(() => this.changeDetectorRef.markForCheck());
                    }, timeToUpdate);
                }
                return null;
            });
        }
        return (min < 0) ? 0 : min;
    }
    ngOnDestroy(): void {
        this.removeTimer();
    }
    private removeTimer() {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
    }
}
