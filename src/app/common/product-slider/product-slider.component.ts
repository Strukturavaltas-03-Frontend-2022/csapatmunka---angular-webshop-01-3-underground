import { Component, OnInit } from '@angular/core';
import { genres } from 'src/app/model/genres';
import { Product } from 'src/app/model/product';
import { DiscountGameListService } from 'src/app/service/discount-game-list.service';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],
})
export class ProductSliderComponent implements OnInit {
  gameList: Product[] = [];
  featuredGames: Product[] = [];
  featuredGenreName: string = '';
  featuredGenreNumber: number = 0;

  constructor(private discountGameListService: DiscountGameListService) {}

  ngOnInit(): void {
    this.gameList = this.discountGameListService.getGameList();
    this.selectingFeaturedGenre();
  }

  selectingFeaturedGenre() {
    this.featuredGenreNumber = Math.floor(Math.random() * 16 + 1);
    this.featuredGenreName = genres.filter(
      (genre) => genre.id === this.featuredGenreNumber
    )[0].name;
  }
}
