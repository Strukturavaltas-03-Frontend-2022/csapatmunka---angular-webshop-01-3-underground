import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService, IMenuItem } from '../service/config.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  appName: string = this.config.appName;
  menuItems: IMenuItem[] = this.config.menuItems;

  constructor(private config: ConfigService, private router: Router) {}

  ngOnInit(): void {}

  onUserLogin(): void {
    this.router.navigate(['/admin']);
  }
}
