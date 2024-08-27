import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseAdvertisementDetailsComponent } from './house-advertisement-details.component';

describe('HouseAdvertisementDetailsComponent', () => {
  let component: HouseAdvertisementDetailsComponent;
  let fixture: ComponentFixture<HouseAdvertisementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseAdvertisementDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseAdvertisementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
