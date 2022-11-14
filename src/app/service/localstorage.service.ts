import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../model/cart';

interface ICache {
  [key: string]: BehaviorSubject<Cart>;
}

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private cache: ICache;

  constructor() {
    this.cache = Object.create(null);
  }

  setItem(key: string, value: Cart): BehaviorSubject<Cart> {
    localStorage.setItem(key, JSON.stringify(value));

    if (this.cache[key]) {
      this.cache[key].next(value);
      return this.cache[key];
    }

    return (this.cache[key] = new BehaviorSubject(value));
  }

  getItem(key: string): BehaviorSubject<Cart> {
    if (this.cache[key]) return this.cache[key];
    else
      return (this.cache[key] = new BehaviorSubject(
        JSON.parse(localStorage.getItem(key) || '[]')
      ));
  }
}
