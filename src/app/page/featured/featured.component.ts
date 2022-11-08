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
  featuredGamesList: Product[] = [];
  featuredGames: Product[] = [];
  featuredGamesOnSale: Product[] = [];

  isHovered: boolean[] = new Array(100).fill(false);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe((games) => {
      this.gameList = [...games];
      this.calculatingFlashSales();
      this.switchFeatured(this.gameList);
      this.chooseFeatured(this.featuredGamesList);
      this.chooseFeaturedOnSale(this.featuredGamesList);
    });

    setInterval(() => {
      this.calculatingFlashSales();
      this.switchFeatured(this.gameList);
    }, 300000);
  }

  switchFeatured(list: Product[]): Product[] {
    list.forEach((game) => {
      if (game.featured === false) {
        if (Math.random() > 0.6) {
          game.featured = true;
        } else {
          game.featured = false;
        }
      } else {
        game.featured = false;
      }
      if (game.featured === true) {
        this.featuredGamesList.push(game);
      }
    });
    return this.featuredGamesList;
  }

  chooseFeatured(list: Product[]): Product[] {
    let randomArray = [...list]
      .sort(() => 0.5 - Math.random())
      .filter((el) => el.onSale === 0);
    this.featuredGames = randomArray.slice(0, 5);
    return this.featuredGames;
  }

  chooseFeaturedOnSale(list: Product[]): Product[] {
    let gamesWithPrice = list.filter((el) => el.price !== 0);
    let randomArray = gamesWithPrice
      .sort(() => 0.5 - Math.random())
      .filter((el) => el.onSale !== 0);
    this.featuredGamesOnSale = randomArray.slice(0, 5);
    return this.featuredGamesOnSale;
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
}
