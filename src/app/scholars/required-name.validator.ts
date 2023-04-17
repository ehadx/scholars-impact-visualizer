import { AbstractControl } from '@angular/forms';
import {
  FormGroup,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export class RequiredName implements Validator {
  validate(group: FormGroup): ValidationErrors | null {
    const { arabicName, englishName } = group.value;
    if (!arabicName && !englishName) return { requiredName: true };
    return null;
  }
}

export function requiredName(): ValidatorFn {
  return (control: AbstractControl<any, any>) =>
    new RequiredName().validate(control as FormGroup);
}
