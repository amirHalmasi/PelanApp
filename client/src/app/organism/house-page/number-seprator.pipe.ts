import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberSeprator',
    standalone: true,
})
export class NumberSepratorPipe implements PipeTransform {
  transform(value: string | number): string {
    if (value == null) return ''; // Return empty string if value is null or undefined

    // Convert the value to string if it's not already
    const numberString = value.toString();

    // Use regex to add commas as thousand separators
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
