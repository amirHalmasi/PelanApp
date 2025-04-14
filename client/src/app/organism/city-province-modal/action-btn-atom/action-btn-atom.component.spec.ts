import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBtnAtomComponent } from './action-btn-atom.component';

describe('ActionBtnAtomComponent', () => {
  let component: ActionBtnAtomComponent;
  let fixture: ComponentFixture<ActionBtnAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ActionBtnAtomComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ActionBtnAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
