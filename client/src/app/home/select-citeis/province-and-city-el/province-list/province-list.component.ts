import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Province } from 'src/app/shared/province.model';

@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.css'],
})
export class ProvinceListComponent {
  @Input() last: boolean = false;
  @Input() item: Province;
}
