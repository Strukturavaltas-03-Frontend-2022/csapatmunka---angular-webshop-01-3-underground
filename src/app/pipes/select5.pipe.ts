import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'select5',
})
export class Select5Pipe implements PipeTransform {
  select5: Set<number> = new Set();
  select5Array: Product[] = [];

  transform(games: Product[]): Product[] {
    if (!Array.isArray(games) || !games || games.length <= 5) {
      return games;
    }
    while (this.select5.size < 5) {
      this.select5.add(Math.floor(Math.random() * games.length));
    }
    return Array.from(this.select5).map((number) => games[number]);
  }
}
