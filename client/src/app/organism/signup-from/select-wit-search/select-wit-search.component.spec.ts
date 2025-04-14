import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWitSearchComponent } from './select-wit-search.component';

describe('SelectWitSearchComponent', () => {
  let component: SelectWitSearchComponent;
  let fixture: ComponentFixture<SelectWitSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SelectWitSearchComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SelectWitSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
