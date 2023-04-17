import { TestBed } from '@angular/core/testing';

import { ScholarApiService } from './scholar-api.service';

describe('ScholarApiService', () => {
  let service: ScholarApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScholarApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
