import { Pipe, PipeTransform } from '@angular/core';
import { Domain } from 'src/domain';

@Pipe({
  name: 'scholarDateType',
})
export class ScholarDateTypePipe implements PipeTransform {
  transform(date: Domain.ScholarDate): string {
    return date.type === 'birth' ? 'ولادة' : 'وفاة';
  }
}
