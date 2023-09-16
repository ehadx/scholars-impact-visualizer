import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { Observable, from } from 'rxjs';
import { Domain } from 'src/domain';

@Injectable({
  providedIn: 'root',
})
export class ScholarApiService {
  constructor() {}

  public findAll(langId: number): Observable<Domain.Scholar[]> {
    return from(invoke<Domain.Scholar[]>('find_all_scholars', { langId }));
  }

  public findAllWhereName(name: string): Observable<Domain.Scholar[]> {
    return from(
      invoke<Domain.Scholar[]>('find_all_scholars_where_name', { name })
    );
  }

  public createWithMultiLang(
    info: Domain.ScholarInfo[],
    langId: number
  ): Observable<Domain.Scholar> {
    return from(
      invoke<Domain.Scholar>('create_scholar_multi_lang', {
        info,
        langId,
      })
    );
  }
}
