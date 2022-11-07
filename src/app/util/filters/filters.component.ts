import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/category';

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

  genres: Category[] = [
    {
      id: 1,
      name: 'Shooter',
      description: '',
    },
    {
      id: 2,
      name: 'Multiplayer',
      description: '',
    },
    {
      id: 3,
      name: 'Singleplayer',
      description: '',
    },
    {
      id: 4,
      name: 'Role-playing game',
      description: '',
    },
    {
      id: 5,
      name: 'Simulator',
      description: '',
    },
    {
      id: 6,
      name: 'Battle Royale',
      description: '',
    },
    {
      id: 7,
      name: 'Sport',
      description: '',
    },
    {
      id: 8,
      name: 'Action',
      description: '',
    },
    {
      id: 9,
      name: 'Horror',
      description: '',
    },
    {
      id: 10,
      name: 'Real-time strategy',
      description: '',
    },
    {
      id: 11,
      name: 'Massively-multiplayer online',
      description: '',
    },
    {
      id: 12,
      name: 'Racing',
      description: '',
    },
    {
      id: 13,
      name: 'Co-op',
      description: '',
    },
    {
      id: 14,
      name: 'Adventure',
      description: '',
    },
    {
      id: 15,
      name: 'Story-driven',
      description: '',
    },
    {
      id: 16,
      name: 'Open-world',
      description: '',
    },
  ];

  @Output() genreChange: EventEmitter<number[]> = new EventEmitter();
  @Output() saleChkbxChange: EventEmitter<boolean> = new EventEmitter();
  @Output() f2pChkbxChange: EventEmitter<boolean> = new EventEmitter();
  @Output() priceRangeChange: EventEmitter<string[]> = new EventEmitter();
  @Output() keywordChange: EventEmitter<string> = new EventEmitter();

  constructor() {}

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
}
