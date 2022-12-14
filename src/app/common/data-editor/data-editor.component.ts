import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

import { headers } from 'src/app/model/headers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiscountGameListService } from 'src/app/service/discount-game-list.service';

@Component({
  selector: 'app-data-editor',
  templateUrl: './data-editor.component.html',
  styleUrls: ['./data-editor.component.scss'],
})
export class DataEditorComponent implements OnInit {
  gameList: Product[] = [];
  headers = headers;

  searchHeader: string = '';
  isSorted: boolean = true;

  @Input() userName: string = '';

  isAuthenticated: boolean = false;
  isEditing: boolean = false;
  isAddingNewGame: boolean = false;

  currentlyEditedGame: Product = new Product();

  allPages: number = 0;
  currentPage: number = 1;
  pageIterator: Array<{ pageNum: number; clicked: boolean }> = [];
  sliceEnd: number = 10;

  listAllGames: boolean = false;

  bannerRegExp = new RegExp(
    '^' +
      'https://firebasestorage.googleapis.com/v0/b/games-webshop.appspot.com/o',
    'i'
  );

  catIdRegExp = new RegExp(/^(([1-9]|([1][0-6])),)*([1-9]|([1][0-6]))$/);

  constructor(
    private productService: ProductService,
    private discountGameListService: DiscountGameListService
  ) {
    this.gameList = this.discountGameListService.getGameList();
    this.allPages = Math.ceil(this.gameList.length / 10);
    for (let i = 0; i < this.allPages; i++)
      this.pageIterator.push({ pageNum: i + 1, clicked: false });
    this.pageIterator[0].clicked = true;
  }

  edit: FormGroup = new FormGroup({
    catId: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.pattern(this.catIdRegExp),
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
      Validators.max(60),
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

  ngDoCheck(): void {
    this.gameList = this.discountGameListService.getGameList();
  }

  clearInputFields() {
    Object.keys(this.edit.controls).forEach((key) => {
      this.edit.controls[key].setValue('');
      this.edit.controls[key].disable();
    });

    this.isEditing = false;
  }

  onAuthAttempt() {
    this.isAuthenticated = true;
  }

  onLogin(userName: string) {
    this.userName = userName;
  }

  onEditGame(game: Product) {
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

    Object.keys(this.edit.controls).forEach((key) => {
      this.edit.controls[key].setValue('');
      this.edit.controls[key].disable();
    });
  }

  onAddNewGame() {
    this.isAddingNewGame = true;

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

    uploadData['catId'] = this.edit.controls['catId'].value
      .split(',')
      .map((el: any) => Number(el));

    uploadData['price'] = Number(this.edit.controls['price'].value);
    uploadData['onSale'] = Number(this.edit.controls['onSale'].value);

    this.productService.addProduct(uploadData).subscribe((addedGame) => {
      console.log(`game was added successfully: ${addedGame}`);

      this.productService.fetchProducts().subscribe((games) => {
        this.gameList = [...games];
        this.discountGameListService.setGameList(this.gameList);
      });
    });

    if (this.listAllGames === true) {
      window.scrollTo({
        top: 50000,
        behavior: 'smooth',
      });
    }
  }

  onSaveEditedGame() {
    const uploadData: Product = this.currentlyEditedGame;
    Object.keys(this.edit.controls).forEach((key) => {
      uploadData[key] = this.edit.controls[key].value;
    });

    if (typeof this.edit.controls['catId'].value === 'string') {
      uploadData['catId'] = this.edit.controls['catId'].value
        .split(',')
        .map((el: any) => Number(el));
    }

    uploadData['price'] = Number(this.edit.controls['price'].value);
    uploadData['onSale'] = Number(this.edit.controls['onSale'].value);

    this.productService
      .updateSingleProduct(uploadData)
      .subscribe((editedGame) => {
        console.log(`editing game was successful: ${editedGame}`);

        this.productService.fetchProducts().subscribe((games) => {
          this.gameList = [...games];
          this.discountGameListService.setGameList(this.gameList);
        });
      });
  }

  onDeleteGame(game: Product) {
    this.productService.deleteProduct(game).subscribe((deletedGame) => {
      console.log(`game was deleted successfully: ${deletedGame}`);

      this.productService.fetchProducts().subscribe((games) => {
        this.gameList = [...games];
        this.discountGameListService.setGameList(this.gameList);
      });
    });
  }

  onSortById() {
    this.searchHeader = 'id';
    this.isSorted = !this.isSorted;
  }

  onSortByHead(head: string) {
    this.searchHeader = head;
    this.isSorted = !this.isSorted;
  }

  // toggling between pagination and all records
  toggleShowAll() {
    this.listAllGames = !this.listAllGames;
  }

  // filtering -----------------------------------------
  genreParams: number[] = [];
  saleChecker: boolean = false;
  freeChecker: boolean = false;
  priceRanges: string[] = [];
  searchString: string = '';

  genreUpdates(params: number[]): void {
    this.genreParams = [...params];
  }

  saleChkbxUpdates(param: boolean): void {
    this.saleChecker = param;
  }

  f2pChkbxUpdates(param: boolean): void {
    this.freeChecker = param;
  }

  priceUpdates(params: string[]): void {
    this.priceRanges = [...params];
  }

  titleUpdates(param: string) {
    this.searchString = param;
  }

  // pagination -----------------------------------------
  onPageClick(page: { pageNum: number; clicked: boolean }) {
    this.currentPage = page.pageNum;
    this.sliceEnd = page.pageNum * 10;
    this.pageIterator.forEach((page) => (page.clicked = false));
    page.clicked = true;
  }

  onArrowClick(direction: string) {
    switch (direction) {
      case '-':
        if (this.currentPage > 1) {
          this.currentPage--;
          this.pageIterator.forEach((pages) => (pages.clicked = false));
          this.pageIterator[this.currentPage - 1].clicked = true;
          this.sliceEnd = this.currentPage * 10;
        }
        break;
      case '+':
        if (this.currentPage < this.allPages) {
          this.currentPage++;
          this.pageIterator.forEach((pages) => (pages.clicked = false));
          this.pageIterator[this.currentPage - 1].clicked = true;
          this.sliceEnd = this.currentPage * 10;
        }
        break;
    }
  }
}
