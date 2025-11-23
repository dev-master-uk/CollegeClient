import { TestBed } from '@angular/core/testing';

import { StudentImgService } from './student-img.service';

describe('StudentImgService', () => {
  let service: StudentImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
