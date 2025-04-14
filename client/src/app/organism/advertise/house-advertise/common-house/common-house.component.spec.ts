import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonHouseComponent } from './common-house.component';

describe('CommonComponent', () => {
  let component: CommonHouseComponent;
  let fixture: ComponentFixture<CommonHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CommonHouseComponent],
}).compileComponents();

    fixture = TestBed.createComponent(CommonHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
