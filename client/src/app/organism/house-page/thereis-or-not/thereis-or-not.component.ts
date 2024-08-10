import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-thereis-or-not',
  templateUrl: './thereis-or-not.component.html',
  styleUrls: ['./thereis-or-not.component.css'],
})
export class ThereisOrNotComponent {
  @Input() determineCheckedOrUnchecked: boolean = false;
}
