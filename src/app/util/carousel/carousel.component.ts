import { Component, Input, OnInit, VERSION } from '@angular/core';
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
  @Input() gameList: Product[] = [];

  constructor() {}

  ngOnInit(): void {}
}
