import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarDialogComponent } from './scholar-dialog.component';

describe('ScholarDialogComponent', () => {
  let component: ScholarDialogComponent;
  let fixture: ComponentFixture<ScholarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
