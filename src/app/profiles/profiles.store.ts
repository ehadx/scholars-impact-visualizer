import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Domain } from 'src/domain';
import { selectAllMajors, selectAllScholars } from '../app.selectors';

export interface ProfilesState {
  majors: Domain.ScholarMajor[];
  filteredMajors: Domain.ScholarMajor[];
  selectedMajors: Domain.ScholarMajor[];
}

@Injectable()
export class ProfilesStore extends ComponentStore<ProfilesState> {
  public readonly scholars$: Observable<Domain.Scholar[]>;
  public readonly majors$: Observable<Domain.ScholarMajor[]>;

  public major: string = '';

  constructor(private readonly store: Store) {
    super();
    this.scholars$ = store.select(selectAllScholars);
    this.majors$ = store.select(selectAllMajors);
  }
}
