import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ScholarsState } from '../scholars.store';
import { ScholarActions } from 'src/app/app.actions';
import { TranslocoService } from '@ngneat/transloco';
import { LanguageState } from 'src/app/app.reducer';
import { selectAllLanguages } from 'src/app/app.selectors';
import { Domain } from 'src/domain';

@Component({
  selector: 'app-scholar-dialog',
  templateUrl: './scholar-dialog.component.html',
  styleUrls: ['./scholar-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScholarDialogComponent {
  @Output() public readonly visibleChange = new EventEmitter();

  @Input('mode') public mode: 'add' | 'edit' = 'add';
  @Input('form') public form!: FormGroup;

  public visible!: boolean;
  public positionLeft: number = 0;
  public positionTop: number = 0;

  private languages: Domain.Language[] = [];

  constructor(
    private readonly store: Store<ScholarsState & LanguageState>,
    private readonly cd: ChangeDetectorRef,
    private readonly transloco: TranslocoService
  ) {
    store.select(selectAllLanguages).subscribe((languages) => {
      this.languages = languages;
      const activeLang = languages.find(
        (lang) => lang.code === this.transloco.getActiveLang()
      )!;
      store.dispatch(ScholarActions.loadRequest({ langId: activeLang.id }));
    });
  }

  public open() {
    this.visible = true;
    this.cd.markForCheck();
  }

  public close() {
    this.visible = false;
  }

  public onCancel() {
    this.form.reset();
    this.visible = false;
    this.close();
  }

  public onSave() {
    const arabicName = this.form.value.arabicName;
    const englishName = this.form.value.englishName;
    const arabicLang = this.languages.find((lang) => lang.code === 'ar')!;
    const englishLang = this.languages.find((lang) => lang.code === 'en')!;
    const arabicInfo: Domain.ScholarInfo = {
      name: arabicName,
      lang: arabicLang,
    };
    const englishInfo: Domain.ScholarInfo = {
      name: englishName,
      lang: englishLang,
    };
    const activeLang = this.languages.find(
      (lang) => lang.code === this.transloco.getActiveLang()
    )!;
    this.store.dispatch(
      ScholarActions.muliLangAddRequest({
        info: [arabicInfo, englishInfo],
        langId: activeLang.id,
      })
    );
  }
}
