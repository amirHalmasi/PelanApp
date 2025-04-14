import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseAdvertisePageComponent } from './house-advertise-page.component';

describe('HouseAdvertisePageComponent', () => {
  let component: HouseAdvertisePageComponent;
  let fixture: ComponentFixture<HouseAdvertisePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HouseAdvertisePageComponent],
}).compileComponents();

    fixture = TestBed.createComponent(HouseAdvertisePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
