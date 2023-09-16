import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Domain } from 'src/domain';

@Component({
  selector: 'app-dates-fieldset',
  templateUrl: './dates-fieldset.component.html',
  styleUrls: ['./dates-fieldset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatesFieldsetComponent {
  @Input() public scholarDates: Domain.ScholarDate[] = [];
  @Output() public readonly scholarDatesChange = new EventEmitter();

  public readonly scholarDateForm = new FormGroup({
    day: new FormControl<number | undefined>(undefined, { nonNullable: true }),
    month: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
    }),
    year: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    era: new FormControl<Domain.ScholarDateEra>('AC', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    accuracy: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
    }),
    type: new FormControl<Domain.ScholarDateType>('birth', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public onAddDate() {
    const { day, month, year, era, accuracy, type } =
      this.scholarDateForm.value;
    const date: Domain.ScholarDate = {
      day: day || null,
      month: month || null,
      year: year!,
      era: era!,
      accuracy: accuracy || null,
      type: type!,
    };
    this.scholarDateForm.reset();
    this.scholarDatesChange.emit([...this.scholarDates, date]);
  }

  public onDeleteDate(date: Domain.ScholarDate) {
    this.scholarDatesChange.emit(this.scholarDates.filter((d) => d !== date));
  }
}
