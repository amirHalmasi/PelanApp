import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseAdvertisesProfileComponent } from './house-advertises-profile.component';

describe('HouseAdvertisesProfileComponent', () => {
  let component: HouseAdvertisesProfileComponent;
  let fixture: ComponentFixture<HouseAdvertisesProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HouseAdvertisesProfileComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(HouseAdvertisesProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
