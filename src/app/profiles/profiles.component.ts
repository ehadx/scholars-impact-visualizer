import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Defaults, Domain } from 'src/domain';
import { AppState } from '../app.reducer';
import { selectAllProfiles } from '../app.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent {
  public profiles$: Observable<Domain.Profile[]>;
  public currentProfile = Defaults.profile();
  public activeItemIndex = 0;
  public dialogVisible = false;

  constructor(private readonly store: Store<AppState>) {
    this.profiles$ = store.select(selectAllProfiles);
  }

  public get dialogHeader() {
    return this.currentProfile.title || 'ملف جديد';
  }

  public openNewProfile() {
    this.currentProfile = Defaults.profile();
    this.dialogVisible = true;
  }
}
