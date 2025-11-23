import { TestBed } from '@angular/core/testing';

import { IdDocumentService } from './id-document.service';

describe('IdDocumentService', () => {
  let service: IdDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
