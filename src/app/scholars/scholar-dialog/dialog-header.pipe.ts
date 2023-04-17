import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dialogHeader',
})
export class DialogHeaderPipe implements PipeTransform {
  transform(mode: 'add' | 'edit'): string {
    return mode === 'add' ? 'إضافة فرد' : 'تعديل فرد';
  }
}
