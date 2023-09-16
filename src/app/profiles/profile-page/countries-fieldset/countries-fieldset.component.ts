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
import { Domain } from 'src/domain';
import { AppState } from 'src/app/app.reducer';
import { selectAllCountries } from 'src/app/app.selectors';

@Component({
  selector: 'app-countries-fieldset',
  templateUrl: './countries-fieldset.component.html',
  styleUrls: ['./countries-fieldset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesFieldsetComponent {
  @Input() public countries: Domain.ProfileCountry[] = [];
  @Output() public readonly countriesChange = new EventEmitter();

  public readonly countryForm = new FormGroup({
    country: new FormControl<Domain.Country | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    note: new FormControl<string>('', { nonNullable: true }),
  });
  public filteredCountries$: Observable<Domain.Country[]>;

  constructor(private readonly store: Store<AppState>) {
    this.filteredCountries$ = store.select(selectAllCountries);
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

  public onAddCountry() {
    const { country, note } = this.countryForm.value;
    const newCountry = { country: country!, note: note! };
    this.countryForm.reset();
    this.countriesChange.emit([...this.countries, newCountry]);
  }

  public onRemoveCountry(country: Domain.ProfileCountry) {
    this.countriesChange.emit(this.countries.filter((c) => c !== country));
  }
}
