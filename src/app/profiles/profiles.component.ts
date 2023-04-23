import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Domain } from 'src/domain';
import { AppState } from '../app.reducer';
import {
  selectAllCountries,
  selectAllMajors,
  selectAllScholars,
} from '../app.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnDestroy {
  private readonly subs = new Subscription();

  public readonly majors$: Observable<Domain.Major[]>;
  public readonly profileForm = new FormGroup({
    school: new FormControl<string>(''),
    syncNation: new FormControl<string>(''),
    additionalInfo: new FormControl<string>(''),
    selectedCountries: new FormControl<Domain.Country[]>([]),
    selectedMajors: new FormControl<Domain.Major[]>([]),
    selectedScholar: new FormControl<Domain.Scholar | null>(null),
    scholarAssociationAccuracy: new FormControl<number>(0),
    scholarDates: new FormControl<Domain.ScholarDate[]>([]),
  });

  public filteredCountries$: Observable<Domain.Country[]>;
  public filteredMajors$: Observable<Domain.Major[]>;
  public filteredScholars$: Observable<Domain.Scholar[]>;

  constructor(private readonly store: Store<AppState>) {
    this.majors$ = store.select(selectAllMajors);
    this.filteredMajors$ = store.select(selectAllMajors);
    this.filteredScholars$ = store.select(selectAllScholars);
    this.filteredCountries$ = store.select(selectAllCountries);
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public get scholarDates() {
    return this.profileForm.value.scholarDates!;
  }

  public set scholarDates(scholarDates: Domain.ScholarDate[]) {
    console.debug(scholarDates);
    this.profileForm.patchValue({ scholarDates });
  }

  public filterMajors({ query }: { query: string }) {
    this.filteredMajors$ = this.store
      .select(selectAllMajors)
      .pipe(map((m) => m.filter((m) => m.name.includes(query))));
  }

  public filterCountries({ query }: { query: string }) {
    this.filteredCountries$ = this.store
      .select(selectAllCountries)
      .pipe(
        map((c) =>
          c.filter(
            (c) =>
              c.en.toLowerCase().includes(query.toLocaleLowerCase()) ||
              c.ar.includes(query)
          )
        )
      );
  }

  public onSelectMajor() {
    // const major = this.majors.filter((m) => m.name === this.majorInputValue)[0];
    // if (major) {
    //   console.log(major);
    // } else {
    //   this.store.dispatch(
    //     MajorActions.addSuccess({
    //       major: { id: 0, name: this.majorInputValue },
    //     })
    //   );
    // }
  }

  public onSelectCountry() {}
}
