import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Domain } from 'src/domain';

@Component({
  selector: 'app-scholars-table',
  templateUrl: './scholars-table.component.html',
  styleUrls: ['./scholars-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScholarsTableComponent {
  @Input('scholars') public scholars: Domain.Scholar[] = [];
}
