import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AutoComplete } from 'primeng/autocomplete';
import { Observable, map } from 'rxjs';
import { Domain } from 'src/domain';
import { AppState } from 'src/app/app.reducer';
import { selectAllMajors } from 'src/app/app.selectors';

@Component({
  selector: 'app-majors-fieldset',
  templateUrl: './majors-fieldset.component.html',
  styleUrls: ['./majors-fieldset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MajorsFieldsetComponent {
  @ViewChild(AutoComplete) private readonly majorsAutoComplete!: AutoComplete;

  @Input() public majors: Domain.ProfileMajor[] = [];
  @Output() public readonly majorsChange = new EventEmitter();

  public readonly majorForm = new FormGroup({
    major: new FormControl<Domain.Major | string | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    reference: new FormControl<string>('', { nonNullable: true }),
  });

  public filteredMajors$: Observable<Domain.Major[]>;

  constructor(private readonly store: Store<AppState>) {
    this.filteredMajors$ = store.select(selectAllMajors);
  }

  public filterMajors({ query }: { query: string }) {
    this.filteredMajors$ = this.store
      .select(selectAllMajors)
      .pipe(map((m) => m.filter((m) => m.title.includes(query))));
  }

  public onAddMajor() {
    const { major, reference } = this.majorForm.value;
    const selectedMajor = this.validateMajor(major!);
    const newMajor: Domain.ProfileMajor = {
      major: selectedMajor,
      reference: reference!,
    };
    this.majorForm.reset();
    this.majorsChange.emit([...this.majors, newMajor]);
  }

  public onDeleteMajor(major: Domain.ProfileMajor) {
    this.majorsChange.emit(this.majors.filter((m) => m !== major));
  }

  private validateMajor(major: Domain.Major | string): Domain.Major {
    return typeof major === 'string'
      ? {
          id: 0,
          title: major,
        }
      : major;
  }
}
