import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedroomSvgComponent } from './bedroom-svg.component';

describe('BedroomSvgComponent', () => {
  let component: BedroomSvgComponent;
  let fixture: ComponentFixture<BedroomSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BedroomSvgComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(BedroomSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
