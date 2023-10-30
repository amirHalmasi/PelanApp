import { AfterContentInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  headerBrand!: string;
  @Input('brandTitle') brand: ElementRef;
  // ngAfterContentInit(): void {
  //   this.headerBrand = this.brand.nativeElement;
  // }
}
