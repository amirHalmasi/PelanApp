import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumberToWordsService {
  private units: string[] = [
    '',
    'یک',
    'دو',
    'سه',
    'چهار',
    'پنج',
    'شش',
    'هفت',
    'هشت',
    'نه',
    'ده',
    'یازده',
    'دوازده',
    'سیزده',
    'چهارده',
    'پانزده',
    'شانزده',
    'هفده',
    'هجده',
    'نوزده',
  ];
  private tens: string[] = [
    '',
    '',
    'بیست',
    'سی',
    'چهل',
    'پنجاه',
    'شصت',
    'هفتاد',
    'هشتاد',
    'نود',
  ];
  private hundreds: string[] = [
    '',
    'یکصد',
    'دویست',
    'سیصد',
    'چهارصد',
    'پانصد',
    'ششصد',
    'هفتصد',
    'هشتصد',
    'نهصد',
  ];

  convertToWords(num: number): string {
    if (num === 0) {
      return 'صفر';
    }

    const parts: string[] = [];
    const billions = Math.floor(num / 1_000_000_000);
    num %= 1_000_000_000;
    const millions = Math.floor(num / 1_000_000);
    num %= 1_000_000;
    const thousands = Math.floor(num / 1_000);
    num %= 1_000;

    if (billions > 0) {
      parts.push(this.convertHundreds(billions) + ' میلیارد');
    }
    if (millions > 0) {
      parts.push(this.convertHundreds(millions) + ' میلیون');
    }
    if (thousands > 0) {
      parts.push(this.convertHundreds(thousands) + ' هزار');
    }
    if (num > 0) {
      parts.push(this.convertHundreds(num));
    }

    return parts.join(' و ');
  }

  private convertHundreds(num: number): string {
    const parts: string[] = [];
    const hundreds = Math.floor(num / 100);
    num %= 100;
    const tens = Math.floor(num / 10);
    const units = num % 10;

    if (hundreds > 0) {
      parts.push(this.hundreds[hundreds]);
    }
    if (tens >= 2) {
      parts.push(this.tens[tens]);
      if (units > 0) {
        parts.push(this.units[units]);
      }
    } else if (tens > 0 || units > 0) {
      parts.push(this.units[tens * 10 + units]);
    }

    return parts.join(' و ');
  }
}
