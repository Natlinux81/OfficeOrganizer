import { TestBed } from '@angular/core/testing';

import { AmountService } from './amount.service';

describe('AmountService', () => {
  let service: AmountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
