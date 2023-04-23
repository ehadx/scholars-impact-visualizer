import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions, CountryActions } from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly links = [
    { path: '/scholars', header: 'أفراد' },
    { path: '/profiles', header: 'ملفات' },
    { path: '/tabular-display', header: 'جدول البيانات' },
  ];

  constructor(private readonly store: Store) {
    this.store.dispatch(AppActions.loaded());
    this.store.dispatch(CountryActions.loadRequest());
  }
}
