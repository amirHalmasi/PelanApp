import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAtmComponent } from './loading-atm.component';

describe('LoadingAtmComponent', () => {
  let component: LoadingAtmComponent;
  let fixture: ComponentFixture<LoadingAtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingAtmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingAtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
