import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-tabular-display',
  templateUrl: './tabular-display.component.html',
  styleUrls: ['./tabular-display.component.scss'],
})
export class TabularDisplayComponent {
  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'الاسم' },
    { field: 'date', headerName: 'التاريخ' },
    { field: 'major', headerName: 'الاختصاص' },
  ];

  rowData = [
    { name: 'Toyota', date: 'Celica', major: 35000 },
    { name: 'Ford', date: 'Mondeo', major: 32000 },
    { name: 'Porsche', date: 'Boxster', mojor: 72000 },
  ];
}
