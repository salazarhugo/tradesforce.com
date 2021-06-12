import { TestBed } from '@angular/core/testing';

import { IexApiService } from './iex-api.service';

describe('IexApiService', () => {
  let service: IexApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IexApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
