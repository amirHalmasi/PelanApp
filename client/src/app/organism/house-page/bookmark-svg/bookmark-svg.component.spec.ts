import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkSvgComponent } from './bookmark-svg.component';

describe('BookmarkSvgComponent', () => {
  let component: BookmarkSvgComponent;
  let fixture: ComponentFixture<BookmarkSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookmarkSvgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
