import { TestBed } from '@angular/core/testing';

import { ClassGService } from './class-g.service';

describe('ClassGService', () => {
  let service: ClassGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
