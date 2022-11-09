import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  genreParams: number[] = [];
  saleChecker: boolean = false;
  freeChecker: boolean = false;
  priceRanges: string[] = [];
  searchString: string = '';

  constructor() {}

  ngOnInit() {}

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
}
