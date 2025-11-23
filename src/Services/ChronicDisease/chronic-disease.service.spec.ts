import { TestBed } from '@angular/core/testing';

import { ChronicDiseaseService } from './chronic-disease.service';

describe('ChronicDiseaseService', () => {
  let service: ChronicDiseaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChronicDiseaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
