import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Domain } from 'src/domain';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    Loaded: emptyProps(),
  },
});

export const ScholarActions = createActionGroup({
  source: 'Scholar',
  events: {
    'Load Request': props<{ langId: number }>(),
    'Load Success': props<{ scholars: Domain.Scholar[] }>(),
    'Muli Lang Add Request': props<{
      info: Domain.ScholarInfo[];
      langId: number;
    }>(),
    'Add Success': props<{ scholar: Domain.Scholar }>(),
  },
});

export const MajorActions = createActionGroup({
  source: 'Major',
  events: {
    'Load Success': props<{ majors: Domain.ScholarMajor[] }>(),
    'Add Success': props<{ major: Domain.ScholarMajor }>(),
  },
});

export const LanguageActions = createActionGroup({
  source: 'Language',
  events: {
    'Load Success': props<{ languages: Domain.Language[] }>(),
  },
});
