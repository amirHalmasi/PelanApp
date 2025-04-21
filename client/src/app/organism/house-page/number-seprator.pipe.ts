import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSeprator',
  standalone: true,
})
export class NumberSepratorPipe implements PipeTransform {
  transform(value: string | number): string {
    // if (value == null) return ''; // Return empty string if value is null or undefined
    if (value == null || isNaN(Number(value))) return ''; // Return empty string if value is null or undefined or not a number

    // if (typeof value === 'string') value = Number(value);
    // let numberString!: string;

    // if (value / 10000 < 1000 && value / 10000 >= 1) {
    //   numberString = (value / 10000 + ' هزار' + ' تومان').toString();
    // } else if (value / 10000000 < 1000 && value / 10000000 >= 1) {
    //   numberString = (value / 10000000 + ' میلیون' + ' تومان').toString();
    // } else if (value / 10000000000 < 1000 && value / 10000000000 >= 1) {
    //   numberString = (value / 10000000000 + ' میلیارد' + ' تومان').toString();
    // } else if (value / 10000000000000 < 1000 && value / 10000000000000 >= 1) {
    //   numberString = (value / 10000000000000 + 'تریلیون' + ' تومان').toString();
    // } else {
    //   numberString = (value / 10 + ' تومان').toString();
    // }
    // Convert the value to string if it's not already
    // return numberString;
    const numberString = Math.floor(Number(value) / 10).toString();

    // Use regex to add commas as thousand separators
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
