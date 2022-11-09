import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  gameList: Product[] = [];

  // isHovered: boolean[] = new Array(100).fill(false);

  @Input() genreParams: number[] = [];
  @Input() saleChecker: boolean = false;
  @Input() freeChecker: boolean = false;
  @Input() priceRanges: string[] = [];
  @Input() searchString: string = '';

  selectedGame: Product = new Product();
  cartProductQuantity: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe((games) => {
      this.gameList = [...games];
      this.productService.calculatingFlashSales(this.gameList);

      this.productService
        .updateProducts(this.gameList)
        .subscribe((games) => console.log(games));
    });

    setInterval(() => {
      this.productService.calculatingFlashSales(this.gameList);
    }, 300000);
  }
  /*
  onHoverGame(index: number) {
    this.isHovered[index] === false
      ? (this.isHovered[index] = true)
      : (this.isHovered[index] = false);
  }*/

  /*calculatingFlashSales() {
    this.gameList.forEach((game) =>
      Math.random() > 0.6
        ? (game.onSale = Math.round(Math.random() * 30) + 5)
        : (game.onSale = 0)
    );
  }*/
  /*
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
  }*/

  onCardClicked(game: Product) {
    this.selectedGame = game;
  }

  addedToCart() {
    this.cartProductQuantity += 1;
  }
}
