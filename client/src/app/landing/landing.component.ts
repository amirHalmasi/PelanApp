import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  // constructor(private animationServ: AnimationService) {}
  // animationDone(event: any) {
  //   console.log(event);
  //   if (
  //     event.fromState === 'open' &&
  //     event.toState === 'void' &&
  //     event.phaseName === 'done'
  //   ) {
  //     this.animationServ.isAnimationCompleted.emit(true);
  //     console.log('User is leaving the page');
  //     // Add your logic here
  //   }
  // }
}
