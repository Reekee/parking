import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priceUse',
})
export class PriceUsePipe implements PipeTransform {
    constructor(
    ) { }
    transform(time: number, rate_over: number, rate_price: number) {
        return (time <= rate_over) ? 0 : ((time - rate_over) * rate_price).toFixed(2);
    }
}
