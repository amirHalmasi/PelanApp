import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdvertisesComponent } from './my-advertises.component';

describe('MyAdvertisesComponent', () => {
  let component: MyAdvertisesComponent;
  let fixture: ComponentFixture<MyAdvertisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAdvertisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdvertisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
