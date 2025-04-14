import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedSvgComponent } from './checked-svg.component';

describe('CheckedSvgComponent', () => {
  let component: CheckedSvgComponent;
  let fixture: ComponentFixture<CheckedSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CheckedSvgComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CheckedSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
