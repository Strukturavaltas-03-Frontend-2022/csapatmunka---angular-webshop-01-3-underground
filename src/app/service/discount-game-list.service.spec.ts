import { TestBed } from '@angular/core/testing';

import { DiscountGameListService } from './discount-game-list.service';

describe('DiscountGameListService', () => {
  let service: DiscountGameListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountGameListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
