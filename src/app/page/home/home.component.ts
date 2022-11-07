import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  gameList: Product[] = [];
  firebaseUrl: string =
    'https://games-webshop-default-rtdb.europe-west1.firebasedatabase.app/games.json';
  isHovered: boolean[] = new Array(100).fill(false);

  filterParams: number[] = [];
  saleChecker: boolean = false;
  priceRanges: string[] = [];
  searchString: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.onFetchProducts();

    setInterval(() => {
      this.calculatingFlashSales();
    }, 300000);
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
        this.calculatingFlashSales();
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
    this.gameList.forEach((game) =>
      Math.random() > 0.6
        ? (game.onSale = Math.round(Math.random() * 30) + 5)
        : (game.onSale = 0)
    );
  }

  paramUpdates(params: number[]): void {
    this.filterParams = params;
  }

  saleChkbxUpdates(param: boolean): void {
    this.saleChecker = param;
  }

  priceUpdates(params: string[]): void {
    this.priceRanges = params;
  }

  titleUpdates(param: string) {
    this.searchString = param;
  }
}
