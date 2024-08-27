import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-elevator-svg',
  templateUrl: './elevator-svg.component.html',
  styleUrls: ['./elevator-svg.component.css'],
})
export class ElevatorSvgComponent {
  @Input() isShow: boolean = false;
}
