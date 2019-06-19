import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'timeUse',
    pure: false
})
export class TimeUsePipe implements PipeTransform {
    private timer: number;
    private timeToUpdate: number = null;
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private ngZone: NgZone,
    ) { }
    transform(value: string) {
        moment.locale('th');
        this.removeTimer();
        let d = new Date(moment(value).unix() * 1000);
        let now = new Date();
        let milliSec = now.getTime() - d.getTime();
        let sec = Math.floor((milliSec) / 1000);
        let min = Math.floor(milliSec / 1000 / 60);
        let hr = Math.floor(milliSec / 1000 / 60 / 60);
        let timeToUpdate = 1000 * 60 - (milliSec % (1000 * 60));
        this.timer = this.ngZone.runOutsideAngular(() => {
            if (typeof window !== 'undefined') {
                return window.setTimeout(() => {
                    this.ngZone.run(() => this.changeDetectorRef.markForCheck());
                }, timeToUpdate);
            }
            return null;
        });
        return min;
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
    private getSecondsUntilUpdate(seconds: number) {
        let min = 60;
        let hr = min * 60;
        let day = hr * 24;
        if (seconds < min) { // less than 1 min, update every 2 secs
            return 2;
        } else if (seconds < hr) { // less than an hour, update every 30 secs
            return 30;
        } else if (seconds < day) { // less then a day, update every 5 mins
            return 300;
        } else { // update every hour
            return 3600;
        }
    }
}
