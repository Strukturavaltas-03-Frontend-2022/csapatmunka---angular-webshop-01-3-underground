import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() game: Product = new Product();
  @Input() cardMargin: string = 'my-5 mx-4';
  @Output() itemAdded: EventEmitter<Cart> = new EventEmitter();
  isHovered: boolean = false;
  cardClicked: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onCardClicked() {
    this.cardClicked = true;
  }

  closeModal() {
    this.cardClicked = false;
  }

  onHoverGame() {
    this.isHovered === false
      ? (this.isHovered = true)
      : (this.isHovered = false);
  }
}
