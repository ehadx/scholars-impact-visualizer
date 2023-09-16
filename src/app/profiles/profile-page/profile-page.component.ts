import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Domain } from 'src/domain';
import { AppState } from '../../app.reducer';
import { selectAllScholars } from '../../app.selectors';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnDestroy {
  @Input() public model!: Domain.Profile;
  @Output() public readonly modelChange = new EventEmitter<Domain.Profile>();
  private readonly subs = new Subscription();

  public readonly profileForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    title: new FormControl<string>('', { nonNullable: true }),
    school: new FormControl<string>('', { nonNullable: true }),
    syncNation: new FormControl<string>('', { nonNullable: true }),
    additionalNotes: new FormControl<string>('', { nonNullable: true }),
    informationalFootprint: new FormControl<string>('', { nonNullable: true }),
    countries: new FormControl<Domain.ProfileCountry[]>([], {
      nonNullable: true,
    }),
    majors: new FormControl<Domain.ProfileMajor[]>([], { nonNullable: true }),
    profileAssociations: new FormControl<Domain.ScholarProfileAssociation[]>(
      [],
      { nonNullable: true }
    ),
    scholarDates: new FormControl<Domain.ScholarDate[]>([], {
      nonNullable: true,
    }),
  });

  public filteredScholars$: Observable<Domain.Scholar[]>;

  constructor(private readonly store: Store<AppState>) {
    this.filteredScholars$ = store.select(selectAllScholars);

    this.profileForm.valueChanges.subscribe((value) => {
      const {
        id,
        title,
        profileAssociations,
        countries,
        majors,
        scholarDates,
        informationalFootprint,
        school,
        additionalNotes,
        syncNation,
      } = value;
      const newModel: Domain.Profile = {
        id: id || 0,
        title: title || '',
        profileAssociations: profileAssociations || [],
        countries: countries || [],
        majors: majors || [],
        dates: scholarDates || [],
        informationalFootprint: informationalFootprint || '',
        school: school || '',
        additionalNotes: additionalNotes || '',
        syncNation: syncNation || '',
      };
      this.modelChange.emit(newModel);
    });
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public get scholarDates() {
    return this.profileForm.value.scholarDates!;
  }

  public set scholarDates(scholarDates: Domain.ScholarDate[]) {
    this.profileForm.patchValue({ scholarDates });
  }

  public get majors() {
    return this.profileForm.value.majors!;
  }

  public set majors(majors: Domain.ProfileMajor[]) {
    this.profileForm.patchValue({ majors });
  }

  public get profileAssociations() {
    return this.profileForm.value.profileAssociations!;
  }

  public set profileAssociations(
    profileAssociations: Domain.ScholarProfileAssociation[]
  ) {
    this.profileForm.patchValue({ profileAssociations });
  }

  public get countries() {
    return this.profileForm.value.countries!;
  }

  public set countries(countries: Domain.ProfileCountry[]) {
    this.profileForm.patchValue({ countries });
  }
}
