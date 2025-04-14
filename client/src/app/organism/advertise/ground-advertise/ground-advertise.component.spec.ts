import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundAdvertiseComponent } from './ground-advertise.component';

describe('GroundAdvertiseComponent', () => {
  let component: GroundAdvertiseComponent;
  let fixture: ComponentFixture<GroundAdvertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [GroundAdvertiseComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(GroundAdvertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
