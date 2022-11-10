import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

import { headers } from 'src/app/model/headers';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-editor',
  templateUrl: './data-editor.component.html',
  styleUrls: ['./data-editor.component.scss'],
})
export class DataEditorComponent implements OnInit {
  gameList: Product[] = [];
  headers: string[] = headers;

  @Input() userName: string = '';

  isAuthenticated: boolean = false;
  isEditing: boolean = false;

  constructor(private productService: ProductService) {
    this.productService.fetchProducts().subscribe((games) => {
      this.gameList = [...games];
    });
  }

  edit: FormGroup = new FormGroup({
    catId: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    name: new FormControl({ value: '', disabled: true }, [Validators.required]),
    info: new FormControl({ value: '', disabled: true }, [Validators.required]),
    banner: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    price: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    discount: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    video: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
  });

  ngOnInit(): void {}

  onAuthAttempt() {
    this.isAuthenticated = true;
  }

  onLogin(userName: string) {
    this.userName = userName;
  }

  onEditGame(game: Product) {
    Object.keys(this.edit.controls).forEach((key) => {
      //this.edit.controls[key].setValue(game.id);

      this.edit.controls[key].enable();
      console.log(this.edit.controls);
    });

    this.edit.controls['name'].setValue(game.name);
    this.edit.controls['info'].setValue(game.description);
    this.edit.controls['banner'].setValue(game.banner);
    this.edit.controls['video'].setValue(game.video);
    this.edit.controls['price'].setValue(game.price);
    this.edit.controls['discount'].setValue(game.onSale);
  }

  onCancelEditingGame() {
    Object.keys(this.edit.controls).forEach((key) => {
      this.edit.controls[key].setValue('');
      this.edit.controls[key].disable();
    });
  }

  onAddNewGame() {
    Object.keys(this.edit.controls).forEach((key) => {
      this.edit.controls[key].setValue('');
      this.edit.controls[key].enable();
    });
  }

  onDeleteGame(game: Product) {
    this.productService.deleteProduct(game).subscribe((game) => {
      this.productService.fetchProducts().subscribe((games) => {
        this.gameList = [...games];
      });
    });
  }
}
