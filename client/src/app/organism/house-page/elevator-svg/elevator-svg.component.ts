import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-elevator-svg',
    templateUrl: './elevator-svg.component.html',
    styleUrls: ['./elevator-svg.component.css'],
    standalone: true,
    imports: [NgIf],
})
export class ElevatorSvgComponent {
  @Input() isShow: boolean = false;
}
