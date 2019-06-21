import { NgModule } from '@angular/core';
import { TimeUsePipe } from './time-use/time-use';
import { PriceUsePipe } from './price-use/price-use';
@NgModule({
    declarations: [
        TimeUsePipe,
        PriceUsePipe
    ],
    imports: [],
    exports: [
        TimeUsePipe,
        PriceUsePipe
    ]
})
export class PipesModule { }
