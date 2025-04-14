import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRequestLoadingAtmComponent } from './send-request-loading-atm.component';

describe('SendRequestLoadingAtmComponent', () => {
  let component: SendRequestLoadingAtmComponent;
  let fixture: ComponentFixture<SendRequestLoadingAtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SendRequestLoadingAtmComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SendRequestLoadingAtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
