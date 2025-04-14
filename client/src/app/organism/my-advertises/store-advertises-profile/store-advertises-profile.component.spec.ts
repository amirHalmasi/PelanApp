import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAdvertisesProfileComponent } from './store-advertises-profile.component';

describe('StoreAdvertisesProfileComponent', () => {
  let component: StoreAdvertisesProfileComponent;
  let fixture: ComponentFixture<StoreAdvertisesProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StoreAdvertisesProfileComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(StoreAdvertisesProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
