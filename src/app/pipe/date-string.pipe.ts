import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateString',
})
export class DateStringPipe implements PipeTransform {
  transform(date): string {
    if (date) {
      return `${date.slice(0, 4)}/${date.slice(4, 6)}/${date.slice(6, 8)}`;
    } else {
      return '';
    }
  }
}
