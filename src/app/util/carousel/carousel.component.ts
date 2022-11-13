import { Component, OnInit, VERSION } from '@angular/core';
import { genres } from 'src/app/model/genres';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  gameList: Product[] = [];
  featuredGames: Product[] = [];
  featuredGenreName: string = '';
  featuredGenreNumber: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe((games) => {
      this.gameList = [...games];
      this.selectingFeaturedGenre();
    });
  }

  selectingFeaturedGenre() {
    this.featuredGenreNumber = Math.floor(Math.random() * 16 + 1);
    this.featuredGenreName = genres.filter(
      (genre) => genre.id === this.featuredGenreNumber
    )[0].name;
  }
}
