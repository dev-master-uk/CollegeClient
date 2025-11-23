import { TestBed } from '@angular/core/testing';

import { GeneralMessageService } from './general-message.service';

describe('GeneralMessageService', () => {
  let service: GeneralMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
