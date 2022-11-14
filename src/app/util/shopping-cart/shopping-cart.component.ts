import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { LocalstorageService } from 'src/app/service/localstorage.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: Cart = new Cart();
  cartOpen: boolean = false;

  constructor(private storageService: LocalstorageService) {}

  ngOnInit(): void {
    this.badgeUpdate();
  }

  onOpenCart() {
    this.cartOpen = !this.cartOpen;
  }

  onEmptyCart() {
    localStorage.clear();
    this.shoppingCart = new Cart();
    this.cartOpen = !this.cartOpen;
  }

  badgeUpdate() {
    this.storageService.getItem('shoppingCart').subscribe((cart) => {
      !cart.itemCount
        ? (this.shoppingCart.itemCount = 0)
        : (this.shoppingCart.itemCount = cart.itemCount);
      !cart.totalPrice
        ? (this.shoppingCart.totalPrice = 0)
        : (this.shoppingCart.totalPrice = cart.totalPrice);

      !cart.games
        ? (this.shoppingCart.games = [])
        : (this.shoppingCart.games = [...cart.games]);
    });
  }
}
