import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Product } from 'src/app/model/product';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product.service';

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

  genreParams: number[] = [];
  saleChecker: boolean = false;
  freeChecker: boolean = false;
  priceRanges: string[] = [];
  searchString: string = '';

  selectedGame: Product = new Product();
  cartProductQuantity: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe((games) => {
      this.gameList = [...games];
      this.calculatingFlashSales();
    });

    setInterval(() => {
      this.calculatingFlashSales();
    }, 300000);
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

  genreUpdates(params: number[]): void {
    this.genreParams = [...params];
  }

  saleChkbxUpdates(param: boolean): void {
    this.saleChecker = param;
  }

  f2pChkbxUpdates(param: boolean): void {
    this.freeChecker = param;
  }

  priceUpdates(params: string[]): void {
    this.priceRanges = [...params];
  }

  titleUpdates(param: string) {
    this.searchString = param;
  }

  onCardClicked(game: Product) {
    this.selectedGame = game;
  }

  addedToCart() {
    this.cartProductQuantity += 1;
  }
}
