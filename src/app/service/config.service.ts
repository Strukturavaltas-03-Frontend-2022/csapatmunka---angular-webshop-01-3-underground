import { Injectable } from '@angular/core';

export interface IMenuItem {
  text: string;
  link: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  appName: string = 'Void Games';

  menuItems: IMenuItem[] = [
    { text: 'Home', link: '/', icon: 'home' },
    { text: 'Featured', link: '/featured' },
    { text: 'Sales', link: '/sales' },
    { text: 'Admin', link: '/admin' },
  ];

  constructor() {}
}
