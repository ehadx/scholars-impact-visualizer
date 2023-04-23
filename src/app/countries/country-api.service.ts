import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { Observable, from } from 'rxjs';
import { Domain } from 'src/domain';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {
  constructor() {}

  public findAll(): Observable<Domain.Country[]> {
    return from(invoke<Domain.Country[]>('find_all_countries'));
  }
}
