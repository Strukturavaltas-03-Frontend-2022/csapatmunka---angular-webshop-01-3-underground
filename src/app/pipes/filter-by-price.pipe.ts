import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'filterByPrice',
})
export class FilterByPricePipe implements PipeTransform {
  transform(games: Product[], filterParams: string[]) {
    if (filterParams.length === 0 || filterParams.length >= 3) {
      return games;
    }
    if (filterParams.length === 1) {
      if (filterParams.includes('low')) {
        return games.filter((game) => game.price <= 5);
      }
      if (filterParams.includes('mid')) {
        return games.filter((game) => game.price > 5 && game.price < 15);
      }
      if (filterParams.includes('high')) {
        return games.filter((game) => game.price >= 15);
      }
    }
    if (filterParams.length === 2) {
      if (filterParams.includes('high') && filterParams.includes('low')) {
        return games.filter((game) => game.price >= 15 || game.price <= 5);
      }
      if (filterParams.includes('high') && filterParams.includes('mid')) {
        return games.filter((game) => game.price > 5);
      }
      if (filterParams.includes('low') && filterParams.includes('mid')) {
        return games.filter((game) => game.price < 15);
      } else {
        return games;
      }
    } else {
      return games;
    }
  }
}
