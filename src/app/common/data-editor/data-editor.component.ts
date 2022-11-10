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
  isAddingNewGame: boolean = false;
  isValid: boolean = false;
  currentlyEditedGame: Product = new Product();

  bannerRegExp = new RegExp(
    '^' +
      'https://firebasestorage.googleapis.com/v0/b/games-webshop.appspot.com/o',
    'i'
  );
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
    description: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    banner: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.pattern(this.bannerRegExp),
    ]),
    price: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    onSale: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.max(50),
    ]),
    video: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
  });

  ngOnInit(): void {}

  clearInputFields() {
    Object.keys(this.edit.controls).forEach((key) => {
      this.edit.controls[key].setValue('');
      this.edit.controls[key].disable();
    });
    this.isValid = false;
    this.isEditing = false;
  }

  onAuthAttempt() {
    this.isAuthenticated = true;
  }

  onLogin(userName: string) {
    this.userName = userName;
  }

  onEditGame(game: Product) {
    this.isValid = true;
    this.currentlyEditedGame = game;
    Object.keys(this.edit.controls).forEach((key) => {
      this.edit.controls[key].setValue(game[key]);
      this.edit.controls[key].enable();
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  onCancelEditingGame() {
    this.isAddingNewGame = false;
    this.isValid = false;
    Object.keys(this.edit.controls).forEach((key) => {
      this.edit.controls[key].setValue('');
      this.edit.controls[key].disable();
    });
  }

  onAddNewGame() {
    this.isAddingNewGame = true;
    this.isValid = true;
    Object.keys(this.edit.controls).forEach((key) => {
      this.edit.controls[key].setValue('');
      this.edit.controls[key].enable();
    });
  }

  onUpdateGame() {
    // New Game post request
    if (this.isAddingNewGame === true) {
      this.onSaveNewGame();
    } // Edit Game patch request
    else {
      this.onSaveEditedGame();
    }
    this.clearInputFields();
  }

  onSaveNewGame() {
    const uploadData: Product = new Product();
    Object.keys(this.edit.controls).forEach((key) => {
      uploadData[key] = this.edit.controls[key].value;
      uploadData.id = this.gameList.length + 1;
    });

    window.scrollTo({
      top: 5000,
      behavior: 'smooth',
    });

    this.productService
      .addProduct(uploadData)
      .subscribe((addedGame) =>
        console.log(`game was added successfully: ${addedGame}`)
      );
  }

  onSaveEditedGame() {
    const uploadData: Product = this.currentlyEditedGame;
    Object.keys(this.edit.controls).forEach((key) => {
      uploadData[key] = this.edit.controls[key].value;
    });

    this.productService
      .updateSingleProduct(uploadData)
      .subscribe((editedGame) =>
        console.log(`editing game was successful: ${editedGame}`)
      );
  }

  onDeleteGame(game: Product) {
    this.productService.deleteProduct(game).subscribe((game) => {
      this.productService.fetchProducts().subscribe((games) => {
        this.gameList = [...games];
      });
    });
  }
}
