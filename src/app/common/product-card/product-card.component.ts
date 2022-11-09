import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() game: Product = new Product();
  isHovered: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onCardClicked() {}
  onHoverGame() {
    this.isHovered === false
      ? (this.isHovered = true)
      : (this.isHovered = false);
  }

  onAddToCart() {}
}
