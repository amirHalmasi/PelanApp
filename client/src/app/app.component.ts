import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
///////////////////////////////////////////////

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    localStorage.removeItem('cityData');
  }
  title = 'Client';
  isMOdalOpen!: boolean;

  //////////////////////////////
  // @ViewChild('scrollableElement') scrollableElement!: ElementRef;
  // private lastScrollTop: number = 0;

  // ngAfterViewInit(): void {
  //   // Ensure the element reference is available
  //   this.scrollableElement.nativeElement.addEventListener(
  //     'scroll',
  //     this.onElementScroll.bind(this)
  //   );
  // }

  // onElementScroll(event: Event): void {
  //   const target = event.target as HTMLElement;
  //   const scrollTop = target.scrollTop;

  //   if (scrollTop > this.lastScrollTop) {
  //     // Scrolling down
  //     console.log('Scrolling down');
  //   } else {
  //     // Scrolling up
  //     console.log('Scrolling up');
  //   }

  //   this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  // }
}
