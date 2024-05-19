import { TestBed } from '@angular/core/testing';

import { AlrtifyService } from './alrtify.service';

describe('AlrtifyService', () => {
  let service: AlrtifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlrtifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
