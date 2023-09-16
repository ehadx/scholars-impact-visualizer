import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { selectAllScholars } from 'src/app/app.selectors';
import { Domain } from 'src/domain';

@Component({
  selector: 'app-scholars-fieldset',
  templateUrl: './scholars-fieldset.component.html',
  styleUrls: ['./scholars-fieldset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScholarsFieldsetComponent {
  @Input() public profileAssociations: Domain.ScholarProfileAssociation[] = [];
  @Output() public readonly profileAssociationsChange = new EventEmitter();

  public filteredScholars$: Observable<Domain.Scholar[]>;

  public readonly associationForm = new FormGroup({
    scholar: new FormControl<Domain.Scholar | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    accuracy: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.min(0), Validators.max(100)],
    }),
  });

  constructor(private readonly store: Store<AppState>) {
    this.filteredScholars$ = store.select(selectAllScholars);
  }

  public filterScholars({ query }: { query: string }) {
    this.filteredScholars$ = this.store
      .select(selectAllScholars)
      .pipe(
        map((s) =>
          s.filter((s) =>
            s.name.toLowerCase().includes(query.toLocaleLowerCase())
          )
        )
      );
  }

  public onAddAssociation() {
    let { scholar, accuracy } = this.associationForm.value;
    const assoc: Domain.ScholarProfileAssociation = {
      scholar: scholar!,
      profile: null,
      accuracy: accuracy || null,
    };
    const profileAssociations = [...this.profileAssociations, assoc];
    this.profileAssociationsChange.emit(profileAssociations);
    this.associationForm.reset();
  }

  public onRemoveAssociation(assoc: Domain.ScholarProfileAssociation) {
    const profileAssociations = this.profileAssociations.filter(
      (a) => a !== assoc
    );
    this.profileAssociationsChange.emit(profileAssociations);
  }
}
