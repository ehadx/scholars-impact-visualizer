import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { Domain } from 'src/domain';
import { AppState } from '../app.reducer';
import { selectAllMajors, selectAllScholars } from '../app.selectors';
import { MajorActions } from '../app.actions';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
  selector: 'app-register',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent {
  @ViewChild(AutoComplete) private readonly majorInput!: AutoComplete;
  private majors!: Domain.ScholarMajor[];

  public readonly scholars$: Observable<Domain.Scholar[]>;
  public readonly majors$: Observable<Domain.ScholarMajor[]>;

  public filteredMajors$: Observable<Domain.ScholarMajor[]>;
  public majorInputValue: string = '';

  constructor(private readonly store: Store<AppState>) {
    this.scholars$ = store.select(selectAllScholars);
    this.majors$ = store
      .select(selectAllMajors)
      .pipe(tap((m) => (this.majors = m)));
    this.filteredMajors$ = this.majors$.pipe(
      map((m) => m.filter((m) => m.name.includes(this.majorInputValue)))
    );
  }

  public onMajorInputValueChange() {
    this.filteredMajors$ = this.majors$.pipe(
      map((m) => m.filter((m) => m.name.includes(this.majorInputValue)))
    );
  }

  public onSelectMajor() {
    const major = this.majors.filter((m) => m.name === this.majorInputValue)[0];
    if (major) {
      console.log(major);
    } else {
      this.store.dispatch(
        MajorActions.addSuccess({
          major: { id: 0, name: this.majorInputValue },
        })
      );
    }
  }
}
