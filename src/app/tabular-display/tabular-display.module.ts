import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectGridRoutingModule } from './tabular-display-routing.module';
import { TabularDisplayComponent } from './tabular-display.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [TabularDisplayComponent],
  imports: [CommonModule, InspectGridRoutingModule, AgGridModule],
})
export class InspectGridModule {}
