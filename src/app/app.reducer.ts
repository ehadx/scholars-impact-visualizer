import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { Domain } from 'src/domain';
import {
  CountryActions,
  LanguageActions,
  MajorActions,
  ScholarActions,
} from './app.actions';

export const SCHOLAR_KEY = 'scholar';

export interface ScholarState extends EntityState<Domain.Scholar> {}

export const scholarAdapter = createEntityAdapter<Domain.Scholar>();

export const scholarInitialState: ScholarState =
  scholarAdapter.getInitialState();

export const scholarReducer = createReducer(
  scholarInitialState,
  on(ScholarActions.loadSuccess, (state, { scholars }) =>
    scholarAdapter.setMany(scholars, state)
  ),
  on(ScholarActions.addSuccess, (state, { scholar }) =>
    scholarAdapter.addOne(scholar, state)
  )
);

export const MAJOR_KEY = 'major';

export interface MajorState extends EntityState<Domain.Major> {}

export const majorAdapter = createEntityAdapter<Domain.Major>();

export const majorInitialState: MajorState = majorAdapter.getInitialState();

export const majorReducer = createReducer(
  majorInitialState,
  on(MajorActions.loadSuccess, (state, { majors }) =>
    majorAdapter.setMany(majors, state)
  ),
  on(MajorActions.addSuccess, (state, { major }) =>
    majorAdapter.addOne(major, state)
  )
);

export const LANGUAGE_KEY = 'lang';

export interface LanguageState extends EntityState<Domain.Language> {}

export const languageAdapter = createEntityAdapter<Domain.Language>();

export const languageInitialState: LanguageState =
  languageAdapter.getInitialState();

export const languageReducer = createReducer(
  languageInitialState,
  on(LanguageActions.loadSuccess, (state, { languages }) =>
    languageAdapter.setMany(languages, state)
  )
);

export const COUNTRY_KEY = 'country';

export interface CountryState extends EntityState<Domain.Country> {}

export const countryAdapter = createEntityAdapter<Domain.Country>();

export const countryInitialState: CountryState =
  countryAdapter.getInitialState();

export const countryReducer = createReducer(
  countryInitialState,
  on(CountryActions.loadSuccess, (state, { countries }) =>
    countryAdapter.setMany(countries, state)
  )
);

export interface AppState {
  [SCHOLAR_KEY]: ScholarState;
  [MAJOR_KEY]: MajorState;
  [LANGUAGE_KEY]: LanguageState;
  [COUNTRY_KEY]: CountryState;
}

export const reducers: ActionReducerMap<AppState> = {
  [SCHOLAR_KEY]: scholarReducer,
  [MAJOR_KEY]: majorReducer,
  [LANGUAGE_KEY]: languageReducer,
  [COUNTRY_KEY]: countryReducer,
};
