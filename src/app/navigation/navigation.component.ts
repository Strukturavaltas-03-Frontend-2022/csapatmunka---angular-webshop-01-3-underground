import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/product';
import { ConfigService, IMenuItem } from '../service/config.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  appName: string = this.config.appName;
  menuItems: IMenuItem[] = this.config.menuItems;

  //@Input() cartItem: Product = new Product();
  @Input() itemsInCart: number = 0;

  constructor(private config: ConfigService) {}

  ngOnInit(): void {}
}
