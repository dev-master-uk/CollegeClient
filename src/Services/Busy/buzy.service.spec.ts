import { TestBed } from '@angular/core/testing';

import { BuzyService } from './buzy.service';

describe('BuzyService', () => {
  let service: BuzyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuzyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
