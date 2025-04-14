import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityListAtmComponent } from './city-list-atm.component';

describe('CityListAtmComponent', () => {
  let component: CityListAtmComponent;
  let fixture: ComponentFixture<CityListAtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CityListAtmComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CityListAtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
