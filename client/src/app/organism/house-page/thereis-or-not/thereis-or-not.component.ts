import { Component, Input } from '@angular/core';
import { UncheckedSvgComponent } from './unchecked-svg/unchecked-svg.component';
import { CheckedSvgComponent } from './checked-svg/checked-svg.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-thereis-or-not',
    templateUrl: './thereis-or-not.component.html',
    styleUrls: ['./thereis-or-not.component.css'],
    standalone: true,
    imports: [
        NgIf,
        CheckedSvgComponent,
        UncheckedSvgComponent,
    ],
})
export class ThereisOrNotComponent {
  @Input() determineCheckedOrUnchecked: boolean = false;
}
