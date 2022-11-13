import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/model/product';
import { genres } from 'src/app/model/genres';
import { Cart } from 'src/app/model/cart';
import { LocalstorageService } from 'src/app/service/localstorage.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() currentGame: Product = new Product();
  genres = genres;
  shoppingCart: Cart = new Cart();

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {}

  constructor(private localstorageService: LocalstorageService) {
    this.localstorageService.getItem('shoppingCart').subscribe((cart) => {
      !cart.itemCount
        ? (this.shoppingCart.itemCount = 0)
        : (this.shoppingCart.itemCount = cart.itemCount);
      !cart.totalPrice
        ? (this.shoppingCart.totalPrice = 0)
        : (this.shoppingCart.totalPrice = cart.totalPrice);
    });
  }

  onAddCart(gamePrice: number) {
    this.shoppingCart.itemCount += 1;
    this.shoppingCart.totalPrice += gamePrice;
    this.localstorageService.setItem('shoppingCart', this.shoppingCart);
  }

  onCloseModal() {
    this.closeModal.emit(false);
  }
}
