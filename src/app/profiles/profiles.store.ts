import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Domain } from 'src/domain';
import { selectAllMajors, selectAllScholars } from '../app.selectors';
import { AppState } from '../app.reducer';

export interface ProfilesState {
  majors: Domain.Major[];
  filteredMajors: Domain.Major[];
  selectedMajors: Domain.Major[];
}

@Injectable()
export class ProfilesStore extends ComponentStore<ProfilesState> {
  public readonly scholars$: Observable<Domain.Scholar[]>;
  public readonly majors$: Observable<Domain.Major[]>;

  public major: string = '';

  constructor(private readonly store: Store<AppState>) {
    super();
    this.scholars$ = store.select(selectAllScholars);
    this.majors$ = store.select(selectAllMajors);
  }
}
