import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Domain } from 'src/domain';

@Component({
  selector: 'app-dates-fieldset',
  templateUrl: './dates-fieldset.component.html',
  styleUrls: ['./dates-fieldset.component.scss'],
})
export class DatesFieldsetComponent {
  @Input() public scholarDates: Domain.ScholarDate[] = [];
  @Output() public readonly scholarDatesChange = new EventEmitter();

  public readonly scholarDateForm = new FormGroup({
    day: new FormControl<number | null>(null),
    month: new FormControl<number | null>(null),
    year: new FormControl<number>(0, [Validators.required]),
    era: new FormControl<Domain.ScholarDateEra>('AC', [Validators.required]),
    accuracy: new FormControl<number | null>(null),
    type: new FormControl<Domain.ScholarDateType>('birth', [
      Validators.required,
    ]),
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
    this.scholarDates = [...this.scholarDates, date];
    this.scholarDatesChange.emit(this.scholarDates);
  }

  public onDeleteDate(date: Domain.ScholarDate) {
    this.scholarDates = this.scholarDates.filter((d) => d !== date);
    this.scholarDatesChange.emit(this.scholarDates);
  }
}
