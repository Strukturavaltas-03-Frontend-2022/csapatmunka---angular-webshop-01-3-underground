import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() currentGame: Product = new Product();

  ngOnInit(): void {}

  constructor() {}

  onAddCart(gamePrice: number) {}
}
