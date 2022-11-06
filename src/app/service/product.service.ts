import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  firebaseUrl: string =
    'https://games-webshop-default-rtdb.europe-west1.firebasedatabase.app/games.json';

  gameList: Product[] = [];

  constructor(private http: HttpClient) {}

  private fetchProducts() {
    this.http
      .get<{ [key: string]: Product }>(this.firebaseUrl)
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
      )
      .subscribe((products) => {
        this.gameList = products;
      });
  }

  onFetchProducts() {
    this.fetchProducts();
  }
}
