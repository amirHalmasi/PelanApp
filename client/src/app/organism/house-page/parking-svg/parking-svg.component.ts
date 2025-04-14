import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-parking-svg',
    templateUrl: './parking-svg.component.html',
    styleUrls: ['./parking-svg.component.css'],
    standalone: true,
    imports: [NgIf],
})
export class ParkingSvgComponent {
  @Input() isShow: boolean = false;
}
