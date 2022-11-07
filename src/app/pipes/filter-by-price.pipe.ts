import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'filterByPrice',
})
export class FilterByPricePipe implements PipeTransform {
  transform(games: Product[], filterParams: string[]) {
    if (filterParams.length === 0 || filterParams.length === 3) {
      return games;
    } else if ((filterParams[0] = 'f2p')) {
      return games.filter((game) => game.price === 0);
    } else if ((filterParams[0] = 'low')) {
      return games.filter((game) => game.price <= 5);
    } else if ((filterParams[0] = 'mid')) {
      return games.filter((game) => game.price > 5 && game.price < 15);
    } else if ((filterParams[0] = 'high')) {
      return games.filter((game) => game.price >= 15);
    } else if (
      (filterParams[0] === 'low' && filterParams[1] === 'mid') ||
      (filterParams[0] === 'mid' && filterParams[1] === 'low')
    ) {
      return games.filter((game) => game.price < 15);
    } else if (
      (filterParams[0] === 'low' && filterParams[1] === 'high') ||
      (filterParams[0] === 'high' && filterParams[1] === 'low')
    ) {
      return games.filter((game) => game.price <= 5 || game.price >= 15);
    } else if (
      (filterParams[0] === 'mid' && filterParams[1] === 'high') ||
      (filterParams[0] === 'high' && filterParams[1] === 'mid')
    ) {
      return games.filter((game) => game.price > 5);
    } else {
      return games;
    }
  }
}
