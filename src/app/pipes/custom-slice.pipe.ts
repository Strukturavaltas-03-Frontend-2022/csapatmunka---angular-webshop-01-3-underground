import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'customSlice',
})
export class CustomSlicePipe implements PipeTransform {
  transform(
    games: Product[],
    showAll: boolean = false,
    start: number,
    end: number
  ) {
    if (!Array.isArray(games) || showAll === true) return games;
    else {
      return games.slice(start, end);
    }
  }
}
