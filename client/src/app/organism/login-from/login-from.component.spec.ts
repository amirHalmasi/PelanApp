import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFromComponent } from './login-from.component';

describe('LoginFromComponent', () => {
  let component: LoginFromComponent;
  let fixture: ComponentFixture<LoginFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
