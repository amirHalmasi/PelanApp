import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThereisOrNotComponent } from './thereis-or-not.component';

describe('ThereisOrNotComponent', () => {
  let component: ThereisOrNotComponent;
  let fixture: ComponentFixture<ThereisOrNotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ThereisOrNotComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ThereisOrNotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
