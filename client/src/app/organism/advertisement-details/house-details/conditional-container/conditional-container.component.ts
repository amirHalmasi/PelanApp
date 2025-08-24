import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  signal,
  TemplateRef,
} from '@angular/core';
import { DetailsComponent } from '../details/details.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-conditional-container',
  templateUrl: './conditional-container.component.html',
  styleUrls: ['./conditional-container.component.css'],
  standalone: true,
  imports: [NgIf],
})
export class ConditionalContainerComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    console.log('this.isShown', this.isShown);
  }

  @ContentChild('content') contentTemplate!: TemplateRef<any>;
  @Input('isShown') isShown!: boolean;

  showItem!: boolean;
}
