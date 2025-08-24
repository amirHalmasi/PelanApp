import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  imports: [NgClass],
})
export class DetailsComponent implements OnInit {
  @Input('Posible_Values') possible_values_obj: { [key: string]: string } = {};
  @Input('Lable') lable: string = '';
  @Input('Real_Value') value: string = '';
  @Input('Aditional_Class') classes?: string = '';
  @Input('Star_values') star_Value?: string[] = [];
  value_text_persian!: string;
  ngOnInit(): void {
    if (this.possible_values_obj.hasOwnProperty(this.value)) {
      this.value_text_persian = this.possible_values_obj[this.value];
    }
  }
}
