import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Domain } from 'src/domain';
import { ScholarState } from '../app.reducer';
import { selectAllScholars } from '../app.selectors';
import { requiredName } from './required-name.validator';
import { ScholarsStore } from './scholars.store';
import { ScholarDialogComponent } from './scholar-dialog/scholar-dialog.component';

@Component({
  selector: 'app-scholars',
  templateUrl: './scholars.component.html',
  styleUrls: ['./scholars.component.scss'],
})
export class ScholarsComponent {
  @ViewChild(ScholarDialogComponent)
  public readonly dialog!: ScholarDialogComponent;

  public readonly scholars$: Observable<Domain.Scholar[]>;
  public readonly scholarForm = new FormGroup(
    {
      arabicName: new FormControl<string>(''),
      englishName: new FormControl<string>(''),
    },
    [requiredName()]
  );

  public dialogMode: 'add' | 'edit' = 'add';

  constructor(private readonly store: Store<ScholarState>) {
    this.scholars$ = store.select(selectAllScholars);
  }
}
