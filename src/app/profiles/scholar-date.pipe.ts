import { Pipe, PipeTransform } from '@angular/core';
import { Domain } from 'src/domain';

@Pipe({
  name: 'scholarDate',
})
export class ScholarDatePipe implements PipeTransform {
  public transform(date: Domain.ScholarDate): string {
    const day = date.day ? date.day + ' ' : '';
    const month = date.month ? 'شهر ' + date.month + ' ' : '';
    const year = 'سنة ' + date.year + ' ';
    const era = date.era === 'AC' ? 'قبل الميلاد' : 'بعد الميلاد';
    return day + month + year + era;
  }
}
