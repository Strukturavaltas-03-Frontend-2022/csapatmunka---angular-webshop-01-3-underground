import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'sortByHeader',
})
export class SortByHeaderPipe implements PipeTransform {
  transform(gameList: Product[], isSorted: boolean, header: string) {
    if (!Array.isArray(gameList) || !header) {
      return gameList;
    }

    if (isSorted) {
      return gameList.sort((a, b) => {
        return typeof a[header] === 'number' && typeof b[header] === 'number'
          ? a[header] - b[header]
          : String(a[header]).localeCompare(String(b[header]));
      });
    } else {
      return gameList.sort((b, a) => {
        return typeof a[header] === 'number' && typeof b[header] === 'number'
          ? a[header] - b[header]
          : String(a[header]).localeCompare(String(b[header]));
      });
    }
  }
}
