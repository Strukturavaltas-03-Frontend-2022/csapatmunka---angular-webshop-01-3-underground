import { Product } from './product';

export class Cart {
  itemCount: number = 0;
  totalPrice: number = 0;
  games: Product[] = [];
}
