import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/product';
import { DiscountGameListService } from 'src/app/service/discount-game-list.service';

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

  constructor(private discountGameListService: DiscountGameListService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.gameList = this.discountGameListService.getGameList();
  }
}
