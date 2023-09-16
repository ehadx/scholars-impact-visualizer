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
    'Load Success': props<{ majors: Domain.Major[] }>(),
    'Add Success': props<{ major: Domain.Major }>(),
  },
});

export const LanguageActions = createActionGroup({
  source: 'Language',
  events: {
    'Load Success': props<{ languages: Domain.Language[] }>(),
  },
});

export const CountryActions = createActionGroup({
  source: 'Country',
  events: {
    'Load Request': emptyProps(),
    'Load Success': props<{ countries: Domain.Country[] }>(),
  },
});

export const ProfileAcitons = createActionGroup({
  source: 'Profile',
  events: {
    'Load Request': props<{ langId: number }>(),
    'Load Success': props<{ profiles: Domain.Profile[] }>(),
  },
});
