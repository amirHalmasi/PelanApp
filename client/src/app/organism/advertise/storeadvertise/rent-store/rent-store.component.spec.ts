import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentStoreComponent } from './rent-store.component';

describe('RentStoreComponent', () => {
  let component: RentStoreComponent;
  let fixture: ComponentFixture<RentStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RentStoreComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(RentStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
