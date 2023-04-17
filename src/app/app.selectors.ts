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
