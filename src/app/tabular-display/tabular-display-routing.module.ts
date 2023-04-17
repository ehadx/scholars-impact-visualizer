import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabularDisplayComponent } from './tabular-display.component';

const routes: Routes = [
  {
    path: '',
    component: TabularDisplayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectGridRoutingModule {}
