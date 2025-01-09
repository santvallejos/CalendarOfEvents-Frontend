import { Pipe, PipeTransform } from '@angular/core';
import { date, format } from '@formkit/tempo';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const formatDate = format(value, { date: "medium", time: "short" });
    return formatDate
  }
}
