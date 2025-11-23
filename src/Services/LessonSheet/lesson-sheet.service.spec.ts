import { TestBed } from '@angular/core/testing';

import { LessonSheetService } from './lesson-sheet.service';

describe('LessonSheetService', () => {
  let service: LessonSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
