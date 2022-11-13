import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  gameList: Product[] = [];

  @Input() genreParams: number[] = [];
  @Input() saleChecker: boolean = false;
  @Input() freeChecker: boolean = false;
  @Input() priceRanges: string[] = [];
  @Input() searchString: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe((games) => {
      this.gameList = [...games];
      this.productService.calculatingFlashSales(this.gameList);

      this.productService
        .updateProducts(this.gameList)
        .subscribe((games) => console.log('games loaded'));
    });

    setInterval(() => {
      this.productService.calculatingFlashSales(this.gameList);
    }, 300000);
  }
}
