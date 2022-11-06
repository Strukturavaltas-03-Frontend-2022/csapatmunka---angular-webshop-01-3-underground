import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'filterByTitle',
})
export class FilterByTitlePipe implements PipeTransform {
  transform(games: Product[], searchString: string) {
    if (searchString === '') {
      return games;
    } else {
      return games.filter((game) =>
        game.name.toLowerCase().includes(searchString.toLowerCase())
      );
    }
  }
}
