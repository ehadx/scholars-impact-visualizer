import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { SelectButtonModule } from 'primeng/selectbutton';

import { RegisterRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfilesComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    FieldsetModule,
    SelectButtonModule,
    ButtonModule,
    DividerModule,
    AutoCompleteModule,
  ],
})
export class ProfilesModule {}
