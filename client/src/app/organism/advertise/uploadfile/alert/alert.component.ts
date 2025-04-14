import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { slideRightInOut } from 'src/app/services/animation';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-alert',
    template: `
    <div
      class="alert m-2"
      [ngClass]="{
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      }"
      *ngIf="message"
      [@slideRightInOut]
    >
      {{ message }}
    </div>
  `,
    styleUrls: ['./alert.component.css'],
    animations: [slideRightInOut],
    standalone: true,
    imports: [NgIf, NgClass],
})
export class AlertComponent implements OnChanges {
  @Input() message: string = '';
  @Input() type!: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && this.message) {
      setTimeout(() => {
        this.message = '';
      }, 5000); // 2000 milliseconds = 2 seconds
    }
  }
}
