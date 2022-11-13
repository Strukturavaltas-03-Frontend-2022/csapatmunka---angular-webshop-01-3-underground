import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  carouselModalPosition: string[] = ['0', '0'];

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private localstorageService: LocalstorageService,
    private router: ActivatedRoute
  ) {
    this.localstorageService.getItem('shoppingCart').subscribe((cart) => {
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

  ngOnInit(): void {
    this.router.url.subscribe((route) =>
      route.length !== 0
        ? (this.carouselModalPosition = ['-20%', '-395%'])
        : (this.carouselModalPosition = ['0', '0'])
    );
  }

  onAddCart(game: Product) {
    this.shoppingCart.itemCount += 1;
    this.shoppingCart.totalPrice += game.price;
    this.shoppingCart.games.push(game);

    this.localstorageService.setItem('shoppingCart', this.shoppingCart);
  }

  onCloseModal() {
    this.closeModal.emit(false);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.closeModal.emit(false);
  }
}
