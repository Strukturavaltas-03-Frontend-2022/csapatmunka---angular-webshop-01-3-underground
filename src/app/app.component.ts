import { Component, OnInit } from '@angular/core';
import { Product } from './model/product';
import { DiscountGameListService } from './service/discount-game-list.service';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Game Webshop';
  gameList: Product[] = [];

  constructor(
    private productService: ProductService,
    private discountGameListService: DiscountGameListService
  ) {}

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe((games) => {
      this.gameList = [...games];
      this.productService.calculatingFlashSales(this.gameList);

      this.productService
        .updateProducts(this.gameList)
        .subscribe((games) => console.log('games loaded ok'));

      this.discountGameListService.setGameList(this.gameList);
    });

    setInterval(() => {
      this.productService.calculatingFlashSales(this.gameList);
      this.discountGameListService.setGameList(this.gameList);
    }, 300000);
  }
}
