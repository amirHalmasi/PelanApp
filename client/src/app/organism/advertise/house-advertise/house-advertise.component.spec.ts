import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseAdvertiseComponent } from './house-advertise.component';

describe('HouseAdvertiseComponent', () => {
  let component: HouseAdvertiseComponent;
  let fixture: ComponentFixture<HouseAdvertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HouseAdvertiseComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(HouseAdvertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
