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
}
