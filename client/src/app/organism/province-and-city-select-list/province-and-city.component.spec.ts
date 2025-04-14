import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceAndCityComponent } from './province-and-city.component';

describe('ProvinceAndCityComponent', () => {
  let component: ProvinceAndCityComponent;
  let fixture: ComponentFixture<ProvinceAndCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProvinceAndCityComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ProvinceAndCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
