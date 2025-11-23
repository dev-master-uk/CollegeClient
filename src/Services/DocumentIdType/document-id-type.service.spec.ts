import { TestBed } from '@angular/core/testing';

import { DocumentIdTypeService } from './document-id-type.service';

describe('DocumentIdTypeService', () => {
  let service: DocumentIdTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentIdTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
