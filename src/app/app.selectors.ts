import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  majorAdapter,
  MajorState,
  MAJOR_KEY,
  scholarAdapter,
  ScholarState,
  SCHOLAR_KEY,
  LanguageState,
  LANGUAGE_KEY,
  languageAdapter,
  countryAdapter,
  CountryState,
  COUNTRY_KEY,
  profileAdapter,
  ProfileState,
  PROFILE_KEY,
} from './app.reducer';

const { selectAll: scholarAdapterSelectAll } = scholarAdapter.getSelectors();

export const selectScholarState =
  createFeatureSelector<ScholarState>(SCHOLAR_KEY);

export const selectAllScholars = createSelector(
  selectScholarState,
  scholarAdapterSelectAll
);

const { selectAll: majorAdapterSelectAll } = majorAdapter.getSelectors();

export const selectMajorState = createFeatureSelector<MajorState>(MAJOR_KEY);

export const selectAllMajors = createSelector(
  selectMajorState,
  majorAdapterSelectAll
);

const { selectAll: languageAdapterSelectAll } = languageAdapter.getSelectors();

export const selectLanguageState =
  createFeatureSelector<LanguageState>(LANGUAGE_KEY);

export const selectAllLanguages = createSelector(
  selectLanguageState,
  languageAdapterSelectAll
);

export const { selectAll: countryAdapterSelectAll } =
  countryAdapter.getSelectors();

export const selectCountryState =
  createFeatureSelector<CountryState>(COUNTRY_KEY);

export const selectAllCountries = createSelector(
  selectCountryState,
  countryAdapterSelectAll
);

const { selectAll: profileAdapterSelectAll } = profileAdapter.getSelectors();

export const selectProfileState =
  createFeatureSelector<ProfileState>(PROFILE_KEY);

export const selectAllProfiles = createSelector(
  selectProfileState,
  profileAdapterSelectAll
);
