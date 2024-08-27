import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-parking-svg',
  templateUrl: './parking-svg.component.html',
  styleUrls: ['./parking-svg.component.css'],
})
export class ParkingSvgComponent {
  @Input() isShow: boolean = false;
}
