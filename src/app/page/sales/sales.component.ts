import { Component, OnInit } from '@angular/core';
import { throws } from 'assert';
import { genres } from 'src/app/model/genres';
import { Product } from 'src/app/model/product';
import { DiscountGameListService } from 'src/app/service/discount-game-list.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  discountGameList: Product[] = [];
  featuredGenreNumbers: number[] = [];
  featuredGenreNames: string[] = [];
  genres = genres;

  constructor(private discountGameListService: DiscountGameListService) {}

  ngOnInit(): void {
    this.discountGameList = this.discountGameListService
      .getGameList()
      .filter((game) => game.onSale !== 0 && game.price !== 0);
    this.generate3UniqueRandomGenres();
  }

  generate3UniqueRandomGenres() {
    while (this.featuredGenreNumbers.length < 3) {
      let random = Math.floor(Math.random() * 16 + 1);
      if (
        !this.featuredGenreNumbers.includes(random) &&
        this.discountGameList.some((game) => game.catId.includes(random))
      ) {
        this.featuredGenreNumbers.push(random);
      }
    }

    this.featuredGenreNumbers.forEach((genre) => {
      this.featuredGenreNames.push(genres[genre - 1].name);
    });
  }
}
