import { TestBed } from '@angular/core/testing';

import { BranchImgService } from './branch-img.service';

describe('BranchImgService', () => {
  let service: BranchImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
