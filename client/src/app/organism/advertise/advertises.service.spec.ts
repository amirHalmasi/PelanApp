import { TestBed } from '@angular/core/testing';

import { AdvertisesService } from './advertises.service';

describe('AdvertisesService', () => {
  let service: AdvertisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
