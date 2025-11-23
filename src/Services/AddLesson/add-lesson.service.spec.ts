import { TestBed } from '@angular/core/testing';

import { AddLessonService } from './add-lesson.service';

describe('AddLessonService', () => {
  let service: AddLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
