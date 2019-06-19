import { NgModule } from '@angular/core';
import { DatetimeAgoPipe } from './datetime-ago/datetime-ago';
import { TimeUsePipe } from './time-use/time-use';
@NgModule({
	declarations: [DatetimeAgoPipe,
    TimeUsePipe],
	imports: [],
	exports: [DatetimeAgoPipe,
    TimeUsePipe]
})
export class PipesModule {}
