import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncheckedSvgComponent } from './unchecked-svg.component';

describe('UncheckedSvgComponent', () => {
  let component: UncheckedSvgComponent;
  let fixture: ComponentFixture<UncheckedSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UncheckedSvgComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(UncheckedSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
