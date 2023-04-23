import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { RegisterRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatesFieldsetComponent } from './dates-fieldset/dates-fieldset.component';
import { ScholarDatePipe } from './scholar-date.pipe';
import { ScholarDateTypePipe } from './scholar-date-type.pipe';

@NgModule({
  declarations: [ProfilesComponent, DatesFieldsetComponent, ScholarDatePipe, ScholarDateTypePipe],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    FieldsetModule,
    SelectButtonModule,
    ButtonModule,
    DividerModule,
    AutoCompleteModule,
    InputTextareaModule,
  ],
})
export class ProfilesModule {}
