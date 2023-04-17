import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

import { ScholarsRoutingModule } from './scholars-routing.module';
import { ScholarsComponent } from './scholars.component';
import { ScholarDialogComponent } from './scholar-dialog/scholar-dialog.component';
import { DialogHeaderPipe } from './scholar-dialog/dialog-header.pipe';
import { ScholarsTableComponent } from './scholars-table/scholars-table.component';

@NgModule({
  declarations: [ScholarsComponent, ScholarDialogComponent, DialogHeaderPipe, ScholarsTableComponent],
  imports: [
    CommonModule,
    ScholarsRoutingModule,
    ReactiveFormsModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
  ],
})
export class ScholarsModule {}
