import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './model/product';
import { ProductService } from './service/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Game Webshop';
  gameList: Product[] = [];
  firebaseUrl: string =
    'https://games-webshop-default-rtdb.europe-west1.firebasedatabase.app/games.json';
  isHovered: boolean[] = new Array(100).fill(false);
  isOnSale: number[] = new Array(100).fill(0);

  constructor(private http: HttpClient) {
    this.calculatingFlashSales();
    setInterval(() => {
      this.calculatingFlashSales();
    }, 300000);
  }

  ngOnInit(): void {
    this.onFetchProducts();
  }

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

  onHoverGame(index: number) {
    this.isHovered[index] === false
      ? (this.isHovered[index] = true)
      : (this.isHovered[index] = false);
  }

  calculatingFlashSales() {
    for (let i = 0; i < this.isOnSale.length; i++) {
      Math.random() > 0.6
        ? (this.isOnSale[i] = Math.round(Math.random() * 20))
        : (this.isOnSale[i] = 0);
    }
  }
}
