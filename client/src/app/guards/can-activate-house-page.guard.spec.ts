import { TestBed } from '@angular/core/testing';

import { CanActivateHousePageGuard } from './can-activate-house-page.guard';

describe('CanActivateHousePageGuard', () => {
  let guard: CanActivateHousePageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateHousePageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
