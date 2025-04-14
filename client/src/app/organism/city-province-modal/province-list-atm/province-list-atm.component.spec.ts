import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceListAtmComponent } from './province-list-atm.component';

describe('ProvinceListAtmComponent', () => {
  let component: ProvinceListAtmComponent;
  let fixture: ComponentFixture<ProvinceListAtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProvinceListAtmComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ProvinceListAtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
