import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListAtomComponent } from './modal-list-atom.component';

describe('ModalListAtomComponent', () => {
  let component: ModalListAtomComponent;
  let fixture: ComponentFixture<ModalListAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalListAtomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalListAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
