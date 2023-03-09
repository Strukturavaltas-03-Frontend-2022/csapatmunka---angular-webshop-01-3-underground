import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Category } from 'src/app/model/category';
import { genres } from 'src/app/model/genres';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  genreFilterArray: number[] = [];
  discountCheck: boolean = false;
  f2pCheck: boolean = false;
  priceRanges: string[] = [];
  searchKey: string = '';
  searching: boolean = false;

  genres: Category[] = genres;

  @Output() genreChange: EventEmitter<number[]> = new EventEmitter();
  @Output() saleChkbxChange: EventEmitter<boolean> = new EventEmitter();
  @Output() f2pChkbxChange: EventEmitter<boolean> = new EventEmitter();
  @Output() priceRangeChange: EventEmitter<string[]> = new EventEmitter();
  @Output() keywordChange: EventEmitter<string> = new EventEmitter();

  @ViewChild('inputSearch') inputField: ElementRef<HTMLInputElement> =
    {} as ElementRef;

  constructor(
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onGenreChange(filterParam: number): void {
    if (this.genreFilterArray.includes(filterParam)) {
      this.genreFilterArray = this.genreFilterArray.filter(
        (el) => el !== filterParam
      );
    } else {
      this.genreFilterArray.push(filterParam);
    }

    this.genreChange.emit(this.genreFilterArray);
  }

  toggleDiscounted(): void {
    if (this.discountCheck === false) {
      this.discountCheck = true;
    } else {
      this.discountCheck = false;
    }
    this.saleChkbxChange.emit(this.discountCheck);
  }

  toggleF2P(): void {
    if (this.f2pCheck === false) {
      this.f2pCheck = true;
    } else {
      this.f2pCheck = false;
    }
    this.f2pChkbxChange.emit(this.f2pCheck);
  }

  onPriceRangeChange(filterParam: string): void {
    if (this.priceRanges.includes(filterParam)) {
      this.priceRanges = this.priceRanges.filter((el) => el !== filterParam);
    } else {
      this.priceRanges.push(filterParam);
    }
    this.priceRangeChange.emit(this.priceRanges);
  }

  onTitleSearch(): void {
    this.keywordChange.emit(this.searchKey);
  }

  onClickSearch(): void {
    this.searching = !this.searching;
    this.changeDetector.detectChanges();

    this.inputField.nativeElement.focus();
    //this.renderer.selectRootElement(this.inputField.nativeElement).focus();
  }
}
