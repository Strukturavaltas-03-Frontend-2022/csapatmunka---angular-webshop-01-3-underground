import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'filterByGenre',
})
export class FilterByGenrePipe implements PipeTransform {
  transform(games: Product[], filterParams: number[]) {
    if (filterParams.length === 0) {
      return games;
    } else
      return games.filter((game) =>
        filterParams.every((id) => game.catId.includes(id))
      );
  }
}
