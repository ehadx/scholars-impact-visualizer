import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface ScholarsState {
  dialogVisible: boolean;
}

@Injectable({ providedIn: 'root' })
export class ScholarsStore extends ComponentStore<ScholarsState> {
  public readonly dialogVisible$ = this.select((s) => s.dialogVisible);

  constructor() {
    super({ dialogVisible: false });
  }
}
