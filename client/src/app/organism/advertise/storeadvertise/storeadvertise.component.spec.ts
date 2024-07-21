import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreadvertiseComponent } from './storeadvertise.component';

describe('StoreadvertiseComponent', () => {
  let component: StoreadvertiseComponent;
  let fixture: ComponentFixture<StoreadvertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreadvertiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreadvertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
