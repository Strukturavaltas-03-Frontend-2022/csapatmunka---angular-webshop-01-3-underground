import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return value === 0 ? 'Free To Play' : value.toString() + '€';
  }
}
