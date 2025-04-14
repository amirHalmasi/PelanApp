import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellStoreComponent } from './sell-store.component';

describe('SellStoreComponent', () => {
  let component: SellStoreComponent;
  let fixture: ComponentFixture<SellStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SellStoreComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SellStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
