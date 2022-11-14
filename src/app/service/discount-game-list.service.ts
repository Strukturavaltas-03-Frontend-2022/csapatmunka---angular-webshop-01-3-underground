import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class DiscountGameListService {
  discountGameList: Product[] = [];

  constructor() {}

  setGameList(gameList: Product[]) {
    this.discountGameList = gameList;
  }

  getGameList(): Product[] {
    return this.discountGameList;
  }
}
