import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAdvertisePageComponent } from './store-advertise-page.component';

describe('StoreAdvertisePageComponent', () => {
  let component: StoreAdvertisePageComponent;
  let fixture: ComponentFixture<StoreAdvertisePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreAdvertisePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreAdvertisePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
