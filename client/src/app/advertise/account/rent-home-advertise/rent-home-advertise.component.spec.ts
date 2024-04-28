import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentHomeAdvertiseComponent } from './rent-home-advertise.component';

describe('RentHomeAdvertiseComponent', () => {
  let component: RentHomeAdvertiseComponent;
  let fixture: ComponentFixture<RentHomeAdvertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentHomeAdvertiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentHomeAdvertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
