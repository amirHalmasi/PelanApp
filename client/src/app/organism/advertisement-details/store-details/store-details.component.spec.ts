import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDetailsComponent } from './store-details.component';

describe('StoreDetailsComponent', () => {
  let component: StoreDetailsComponent;
  let fixture: ComponentFixture<StoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StoreDetailsComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(StoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
