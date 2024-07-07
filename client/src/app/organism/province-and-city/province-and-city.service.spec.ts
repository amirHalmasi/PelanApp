import { TestBed } from '@angular/core/testing';

import { ProvinceAndCityService } from './province-and-city.service';

describe('ProvinceAndCityService', () => {
  let service: ProvinceAndCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinceAndCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
