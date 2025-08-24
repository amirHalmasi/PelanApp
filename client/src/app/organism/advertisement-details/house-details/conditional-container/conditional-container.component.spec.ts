import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalContainerComponent } from './conditional-container.component';

describe('ConditionalContainerComponent', () => {
  let component: ConditionalContainerComponent;
  let fixture: ComponentFixture<ConditionalContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionalContainerComponent]
    });
    fixture = TestBed.createComponent(ConditionalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
