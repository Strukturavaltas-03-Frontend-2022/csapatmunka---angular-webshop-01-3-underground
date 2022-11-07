import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'filterByF2p',
})
export class FilterByF2pPipe implements PipeTransform {
  transform(games: Product[], f2pCheck: boolean) {
    if (f2pCheck === false) {
      return games;
    } else return games.filter((game) => game.price === 0);
  }
}
