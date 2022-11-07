import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'filterByDiscount',
})
export class FilterByDiscountPipe implements PipeTransform {
  transform(games: Product[], discountCheck: boolean) {
    if (discountCheck === false) {
      return games;
    } else
      return games.filter((game, i) => {
        if (game.onSale !== 0 && game.price !== 0) {
          return game;
        } else return null;
      });
  }
}
