import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AppActions,
  CountryActions,
  LanguageActions,
  ScholarActions,
} from './app.actions';
import { EMPTY, catchError, concatMap, exhaustMap, map, of } from 'rxjs';
import { LanguageApiService } from './languages/language-api.service';
import { ScholarApiService } from './scholars/scholar-api.service';
import { CountryApiService } from './countries/country-api.service';

@Injectable()
export class AppEffects {
  public readonly loadLanguages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loaded),
      exhaustMap(() =>
        this.languageApi.findAll().pipe(
          map((languages) => LanguageActions.loadSuccess({ languages })),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
      )
    )
  );

  public readonly loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadRequest),
      exhaustMap(() =>
        this.countryApi.findAll().pipe(
          map((countries) => {
            console.debug('countries', countries);
            return CountryActions.loadSuccess({ countries });
          }),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
      )
    )
  );

  public readonly loadScholars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScholarActions.loadRequest),
      exhaustMap(({ langId }) =>
        this.scholarApi.findAll(langId).pipe(
          map((scholars) => {
            console.debug('scholars', scholars);
            return ScholarActions.loadSuccess({ scholars });
          }),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
      )
    )
  );

  public readonly createScholarMultiLang$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScholarActions.muliLangAddRequest),
      concatMap(({ info, langId }) =>
        this.scholarApi.createWithMultiLang(info, langId).pipe(
          map((scholar) => ScholarActions.addSuccess({ scholar })),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly languageApi: LanguageApiService,
    private readonly scholarApi: ScholarApiService,
    private readonly countryApi: CountryApiService
  ) {}
}
