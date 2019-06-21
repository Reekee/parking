import { NgModule } from '@angular/core';
import { DatetimeAgoPipe } from './datetime-ago/datetime-ago';
import { TimeUsePipe } from './time-use/time-use';
import { PriceUsePipe } from './price-use/price-use';
@NgModule({
    declarations: [DatetimeAgoPipe,
        TimeUsePipe,
        PriceUsePipe],
    imports: [],
    exports: [DatetimeAgoPipe,
        TimeUsePipe,
        PriceUsePipe]
})
export class PipesModule { }
