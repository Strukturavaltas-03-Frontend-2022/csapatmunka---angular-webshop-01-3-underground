import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  firebaseUrl: string = environment.apiURL;
  entity: string = 'games.json';

  constructor(private http: HttpClient) {}

  fetchProducts() {
    return this.http
      .get<{ [key: string]: Product }>(`${this.firebaseUrl}${this.entity}`)
      .pipe(
        map((responseData) => {
          const productArray: Product[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              productArray.push({ ...responseData[key], uniqueId: key });
            }
          }
          return productArray;
        })
      );
  }

  calculatingFlashSales(gameList: Product[]) {
    gameList.forEach((game) =>
      Math.random() > 0.6
        ? (game.onSale = Math.round(Math.random() * 30) + 5)
        : (game.onSale = 0)
    );
  }

  updateProducts(updateArray: Product[]) {
    let updatedObject: { [key: string]: Product } = {};
    updateArray.forEach((game) => {
      updatedObject[game.uniqueId] = game;
    });
    return this.http.patch(`${this.firebaseUrl}${this.entity}`, updatedObject);
  }
}
