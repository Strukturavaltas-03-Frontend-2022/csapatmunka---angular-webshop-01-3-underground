export class Product {
  [key: string]: any;
  uniqueId: string = '';
  id: number = 1;
  catId: number[] = [];
  name: string = 'Title of the game';
  description: string = 'Description of the game';
  banner: string = 'Banner image link';
  video: string = 'Display video link';
  price: number = 14.99;
  stock: number = 0;
  featured: boolean = false;
  active: boolean = true;
  onSale: number = 0;
}
