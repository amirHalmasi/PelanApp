import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityProvinceModalComponent } from './city-province-modal.component';

describe('CityProvinceModalComponent', () => {
  let component: CityProvinceModalComponent;
  let fixture: ComponentFixture<CityProvinceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityProvinceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityProvinceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
