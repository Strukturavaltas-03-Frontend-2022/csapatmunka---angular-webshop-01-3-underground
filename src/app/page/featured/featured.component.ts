import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  gameList: Product[] = [];
  constructor(productService: ProductService) {
    this.gameList = productService.fetchProducts();
    console.log(this.gameList);
  }

  ngOnInit(): void {}
}
