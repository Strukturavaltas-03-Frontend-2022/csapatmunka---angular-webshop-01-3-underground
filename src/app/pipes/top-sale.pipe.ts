import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'topSale',
})
export class TopSalePipe implements PipeTransform {
  transform(games: Product[], numberOfItems: number) {
    if (!Array.isArray(games) || !numberOfItems) return games;

    return games.sort((a, b) => b.onSale - a.onSale).slice(0, numberOfItems);
  }
}
