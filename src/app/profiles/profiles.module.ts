import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { RegisterRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { DatesFieldsetComponent } from './profile-page/dates-fieldset/dates-fieldset.component';
import { ScholarDatePipe } from './scholar-date.pipe';
import { ScholarDateTypePipe } from './scholar-date-type.pipe';
import { ScholarsFieldsetComponent } from './profile-page/scholars-fieldset/scholars-fieldset.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MajorsFieldsetComponent } from './profile-page/majors-fieldset/majors-fieldset.component';
import { CountriesFieldsetComponent } from './profile-page/countries-fieldset/countries-fieldset.component';

@NgModule({
  declarations: [
    ProfilesComponent,
    DatesFieldsetComponent,
    ScholarDatePipe,
    ScholarDateTypePipe,
    ScholarsFieldsetComponent,
    ProfilePageComponent,
    MajorsFieldsetComponent,
    CountriesFieldsetComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    FieldsetModule,
    SelectButtonModule,
    ButtonModule,
    AutoCompleteModule,
    InputTextareaModule,
    TableModule,
    DialogModule,
  ],
})
export class ProfilesModule {}
