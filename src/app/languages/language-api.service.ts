import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { Observable, from } from 'rxjs';
import { Domain } from 'src/domain';

@Injectable({
  providedIn: 'root',
})
export class LanguageApiService {
  constructor() {}

  findAll(): Observable<Domain.Language[]> {
    return from(invoke<Domain.Language[]>('find_all_languages'));
  }
}
