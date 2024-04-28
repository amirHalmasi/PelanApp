import { Component, Input } from '@angular/core';
import { Rent } from 'src/app/shared/rent.model';

@Component({
  selector: 'app-rentitem',

  templateUrl: './rentitem.component.html',
  styleUrl: './rentitem.component.css',
})
export class RentitemComponent {
  isDatailes: boolean = false;
  @Input() rentItemData: Rent;
  priceConverter(price: string) {
    if (+price == 0 || price == null || price == '') {
      return '';
    } else if (1 <= +price / 1000000 && +price / 1000000 < 1000) {
      return +price / 1000000 + ' میلیون';
    } else if (1 <= +price / 1000000000 && +price / 1000000 < 1000) {
      return +price / 1000000000 + ' میلیارد';
    } else {
      return price;
    }
  }
}
