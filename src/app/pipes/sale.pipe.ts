import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale',
})
export class SalePipe implements PipeTransform {
  transform(value: number, isOnSale: number): number {
    return Number(((value / (100 - isOnSale)) * 100).toPrecision(2));
  }
}
