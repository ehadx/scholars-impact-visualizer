import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'scholars',
  },
  {
    path: 'scholars',
    loadChildren: () =>
      import('./scholars/scholars.module').then((m) => m.ScholarsModule),
  },
  {
    path: 'profiles',
    loadChildren: () =>
      import('./profiles/profiles.module').then((m) => m.ProfilesModule),
  },
  {
    path: 'tabular-display',
    loadChildren: () =>
      import('./tabular-display/tabular-display.module').then(
        (m) => m.InspectGridModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
