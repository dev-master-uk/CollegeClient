import { TestBed } from '@angular/core/testing';

import { VideolessonsService } from './videolessons.service';

describe('VideolessonsService', () => {
  let service: VideolessonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideolessonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
